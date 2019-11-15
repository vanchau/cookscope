
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

let users = [
    {
        "username": "bobster",
        "name": "Bob Bobson",
        "profilePicture": "./assets/dummy/bobster.PNG",
        "saved": [],
        "followed": []
    },
    {
        "username": "lobster",
        "name": "Lob Lobson",
        "profilePicture": "./assets/dummy/lobster.PNG",
        "saved": ["5dc72284539a4025084615a1", "5dc7351b58d59d3f38b6442d", "5dc735d158d59d3f38b64435"],
        "followed":["gobster"]
    },
    {
        "username": "gobster",
        "name": "Gob Gobson",
        "profilePicture": "./assets/dummy/gobster.PNG",
        "saved": ["5dc72284539a4025084615a1", "5dc7355e58d59d3f38b64430"],
        "followed":["lobster", "bobster"]
    }
]

/* app.get('/api/users/:username', (req, res) => {
    const username = req.params.username
    const user = users.find(user => user.username === username)
    if (user) {
        res.json(user)
    }
    else {
        res.status(404).end()
    }
}) */

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
    //const authorID = JSON.stringify(req.user._id)
    const username = req.user.username
    const recipes = await Recipe.find({ author: username })
    res.json(recipes.map(recipe => recipe.toJSON()))
})

/*
app.get('/api/users/:username/ownrecipes', async (request, response) => {
    const username = request.params.username
    console.log('username', typeof username)
    const recipes = await Recipe.find({author: username})
    response.json(recipes.map(recipe => recipe.toJSON()))
})
*/

/*
app.get('/api/users/:username/savedrecipes', async (request, response) => {
    const username = request.params.username
    const user = users.find(user => user.username === username)
    const recipes = await Recipe.find().where('_id').in(user.saved);
    response.json(recipes.map(recipe => recipe.toJSON()))
})
*/

/*
app.get('/api/users/:username/followed', (req, res) => {
    const username = req.params.username
    const user = users.find(user => user.username === username)
    const followed = users.filter(u => user.followed.includes(u.username))
    if (followed) {
        res.json(followed)
    }
    else {
        res.status(404).end()
    }
})
*/

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
