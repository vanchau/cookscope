
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const moment = require('moment');

app.use(express.static('build'))
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cors())
// HTTP request logger middleware
app.use(morgan('dev'));

const Recipe = require('./models/recipe')
const User = require('./models/user')
const Comment = require('./models/comment')
const auth = require('./middleware/auth')

let recipes = []

const fetchAll = async () => {
    recipes = await Recipe.find({})
    recipes.reverse()
}

fetchAll()

Recipe.watch().on('change', async data => {
    fetchAll()
})

app.post('/api/recipes', auth, async (req, res) => {
    const body = req.body
    const user = req.user.toObject()
    const recipe = new Recipe({
        author: user.username,
        authorID: mongoose.Types.ObjectId(user._id),
        title: body.title,
        description: body.description,
        imageFile: body.imageFile,
        hours: body.hours,
        minutes: body.minutes,
        servings: body.servings,
        difficulty: body.difficulty,
        categories: body.categories,
        ingredients: body.ingredients,
        instructions: body.instructions,
        ratings: []
    })

    const savedRecipe = await recipe.save()
    res.json(savedRecipe.toJSON())
})

app.get('/api/recipes', async (request, response) => {
    const searchWords = request.query.searchWords
    const selectedCategories = request.query.selectedCategories
    const selectedDifficulties = request.query.selectedDifficulties
    const selectedTimes = request.query.selectedTimes
    const selectedDiets = request.query.selectedDiets

    let filteredRecipes = []

    if (!searchWords) {
        filteredRecipes = recipes
    } 
    else {
        const someMatch = recipes.filter(function(recipe){
            let ingredientArray = recipe.ingredients.map(ingredient => ingredient.ingredient.split(' ')).flat()

            if (searchWords.some(word => recipe.title.toLowerCase().split(" ").includes(word))) return true
            if (searchWords.some(word => recipe.title.toLowerCase().includes(word))) return true
            if (ingredientArray.some(ingredient => searchWords.includes(ingredient))) return true
            return false
        })
        someMatch.sort(function(a,b){
            const titleA = a.title.toLowerCase()
            const titleASplit = titleA.split(" ")
            const titleB = b.title.toLowerCase()
            const titleBSplit = titleB.split(" ")
            const boolA = searchWords.map(word => titleASplit.includes(word))
            const boolB = searchWords.map(word => titleBSplit.includes(word))
            const matchesA = boolA.filter(x => x === true).length
            const matchesB = boolB.filter(x => x === true).length
            if (matchesA > matchesB) return -1
            else if (matchesA < matchesB) return 1
            else {
                const subStringInA = searchWords.map(word => titleA.includes(word))
                const subStringInB = searchWords.map(word => titleB.includes(word))
                const subStringMatchesA = subStringInA.filter(x => x === true).length
                const subStringMatchesB = subStringInB.filter(x => x === true).length
                if (subStringMatchesA > subStringMatchesB) return -1
                if (subStringMatchesA < subStringMatchesB) return 1
                return 0
            }
        })
        filteredRecipes = someMatch 
    }
    if (selectedCategories) {
        filteredRecipes = filteredRecipes.filter(recipe => selectedCategories.every(category => recipe.categories.includes(category)))
    }
    if (selectedDifficulties) {
        filteredRecipes = filteredRecipes.filter(recipe => selectedDifficulties.includes(recipe.difficulty))
    }
    if (selectedTimes) {
        if (selectedTimes.includes('Under 1 hour')) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.hours === 0)
        }
        else if (selectedTimes.includes('Under 45 minutes')) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.hours === 0 && recipe.minutes < 45)
        }
        else if (selectedTimes.includes('Under 30 minutes')) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.hours === 0 && recipe.minutes < 30)
        }
        else if (selectedTimes.includes('Under 15 minutes')) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.hours === 0 && recipe.minutes < 15)
        }
        else filteredRecipes = filteredRecipes
    }
    if (selectedDiets) {
        filteredRecipes = filteredRecipes.filter(recipe => selectedDiets.every(diet => recipe.categories.includes(diet)))
    }

    response.json(filteredRecipes.map(recipe => recipe.toJSON()))
})

app.get('/api/recipes/:id', async (req, res) => {
    const recipe = recipes.find(recipe => recipe.id === req.params.id)
    res.json(recipe.toJSON())
})

app.get('/api/recipes/:id/comments', async (req, res) => {
    const comments = await Comment.find({ recipeID: req.params.id }).sort({ _id: -1 })
    res.json(comments.map(comment => comment.toJSON()))
})

app.post('/api/recipes/:id/comment', auth, async (req, res) => {
    try {
        const text = req.body
        const user = req.user.toObject()
        const parsedComment = {
            recipeID: mongoose.Types.ObjectId(req.params.id),
            poster: user.username,
            posterID: mongoose.Types.ObjectId(user._id),
            comment: text.comment,
            date: moment().subtract(10, 'days').calendar()
        }
        const comment = new Comment(parsedComment)
        await comment.save()
        res.status(201).send({ comment })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/api/recipes/:recipeID/remove', auth, async (req, res) => {
   try {
    const deleteRecipe = await Recipe.deleteOne({ "_id" : mongoose.Types.ObjectId(req.params.recipeID) })
        res.status(201).send(deleteRecipe)
   } catch (error) {
        res.status(400).send(error)
   }

})

app.put('/api/recipes/:id/rating/:userId', async (req, res) => {
    try {
        const rating = req.body
        let recipe = recipes.find(recipe => recipe.id === req.params.id)
        recipe.ratings = recipe.ratings.filter(rating => rating.userId !== req.params.userId)
        recipe.ratings.push(rating)
        await Recipe.findByIdAndUpdate(req.params.id, recipe, {new: true})
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/api/recipes/:id/rating', async (req, res) => {
    try {
        const recipe = recipes.find(recipe => recipe.id === req.params.id)
        const arr = recipe.ratings.map(rating => rating.rating)
        const rating = Math.round(arr.reduce((acc, curr) => acc + curr, 0) / recipe.ratings.length * 10) / 10
        res.json({rating})
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/api/recipes/:id/rating/:userId', async (req, res) => {
    try {
        const recipe = recipes.find(recipe => recipe.id === req.params.id)
        const rating = (recipe.ratings.find(rating => rating.userId === req.params.userId)).rating
        res.json({rating})
    } catch (error) {
        res.status(400).send(error)
    }
})


app.post('/api/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/api/users/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
})

// Get user info. Can be accessed by anyone.
app.get('/api/users/:username', async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.getProfileInfoByUsername(username)
        res.send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

app.post('/api/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/api/users/:username/recipes', async (req, res) => {
    const username = req.params.username
    const ownRecipes = recipes.filter(recipe => recipe.author === username)
    res.json(ownRecipes.map(recipe => recipe.toJSON()))
})

app.get('/api/users/:username/bookmarked-recipes', auth, async (req, res) => {
    const username = req.params.username
    const userInfo = await User.findOne({ username: username })
    const bookmarkedRecipes = recipes.filter(recipe => userInfo.bookmarks.includes(recipe.id))
    res.json(bookmarkedRecipes.map(recipe => recipe.toJSON()))
})

app.put('/api/users/:username/:isBookmarked/:recipeID', async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    let bookmarks = recipes.filter(recipe => user.bookmarks.includes(recipe.id)).map(recipe => recipe.id)
    if (req.params.isBookmarked === 'true') {
        bookmarks = bookmarks.filter(bookmark => bookmark !== req.params.recipeID)
    }
    else {
        bookmarks.push(req.params.recipeID)
    }
    await User.findOneAndUpdate({username: req.params.username}, {bookmarks: bookmarks}, {new: true})

})

app.get('/api/users/:username/bookmarked/:recipeID', async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    let bookmarks = recipes.filter(recipe => user.bookmarks.includes(recipe.id)).map(recipe => recipe.id)
    const isBookmarked = bookmarks.includes(req.params.recipeID)
    res.json({isBookmarked})
})

app.get('/api/users/:username/following', async (req, res) => {
    const username = req.params.username
    const userInfo = await User.findOne({ username: username })
    const users = await User.findProfilesByIds(userInfo.following)
    res.json(users)
})

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
