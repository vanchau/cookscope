
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
app.use(express.static('build'))
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cors())
// HTTP request logger middleware
app.use(morgan('dev'));

const Recipe = require('./models/recipe')
const User = require('./models/user')
const auth = require('./middleware/auth')

app.post('/api/recipes', (request, response) => {
    const body = request.body
    const recipe = new Recipe({
        author: "bobster", // temp
        title: body.title,
        description: body.description,
        imageFile: body.imageFile,
        hours: body.hours,
        minutes: body.minutes,
        servings: body.servings,
        difficulty: body.difficulty,
        categories: body.categories,
        ingredients: body.ingredients,
        instructions: body.instructions
    })

    recipe.save().then(savedRecipe => {
        response.json(savedRecipe.toJSON())
        console.log("Recipe saved to database! :)")
    }) 

})

app.get('/api/recipes', async (request, response) => {
    const recipes = await Recipe.find({})
    response.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/recipes/:id', (request, response) => {
    Recipe.findById(request.params.id).then(recipe => {
      response.json(recipe.toJSON())
    })
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

app.get('/api/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
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

app.get('/api/users/me/recipes', auth, async (req, res) => {
    const username = req.user.username
    const recipes = await Recipe.find({ author: username })
    res.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/users/me/bookmarked-recipes', auth, async (req, res) => {
    const bookmarks = req.user.toObject().bookmarks
    console.log('bookmarks', bookmarks)
    const recipes = await Recipe.find().where('_id').in(bookmarks)
    res.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/users/me/following', auth, async (req, res) => {
    const following = req.user.toObject().following
    const users = await User.findProfilesByIds(following)
    res.json(users)
})

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
