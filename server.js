
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

app.post('/api/recipes', auth, async (req, res) => {
    const body = req.body
    const user = req.user.toObject()
    const recipe = new Recipe({
        author: user.username,
        authorID: user._id,
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
    const recipes = await Recipe.find({})
    response.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/recipes/:id', (request, response) => {
    Recipe.findById(request.params.id).then(recipe => {
      response.json(recipe.toJSON())
    })
})

app.put('/api/recipes/:id', async (req, res) => {
    const body = req.body
    const updated = await Recipe.findOneAndUpdate({_id: req.params.id}, {$push: {ratings: body}})
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
    const recipes = await Recipe.find({ author: username })
    res.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/users/:username/bookmarked-recipes', auth, async (req, res) => {
    //const bookmarks = req.user.toObject().bookmarks
    const username = req.params.username
    const userInfo = await User.findOne({ username: username })
    const recipes = await Recipe.find().where('_id').in(userInfo.bookmarks)
    res.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/users/:username/following', async (req, res) => {
    //const following = req.user.toObject().following
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
