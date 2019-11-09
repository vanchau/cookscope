
require('dotenv').config()
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

app.post('/api/recipes', (request, response) => {
    const body = request.body
    const recipe = new Recipe({
        author: "bobster", // temp
        title: body.title,
        description: body.description,
        imageFile: body.imageFile,
        timeToCook: body.timeToCook,
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
        "followed":[]
    },
    {
        "username": "lobster",
        "name": "Lob Lobson",
        "profilePicture": "./assets/dummy/lobster.PNG",
        "saved": ["5dc72284539a4025084615a1"],
        "followed":["gobster"]
    },
    {
        "username": "gobster",
        "name": "Gob Gobson",
        "profilePicture": "./assets/dummy/gobster.PNG",
        "saved": ["5dc72284539a4025084615a1"],
        "followed":["lobster", "bobster"]
    }
]

app.get('/api/users/:username', (req, res) => {
    const username = req.params.username
    const user = users.find(user => user.username === username)
    if (user) {
        res.json(user)
    }
    else {
        res.status(404).end()
    }
})

app.get('/api/users/:username/ownrecipes', async (request, response) => {
    const username = request.params.username
    const recipes = await Recipe.find({author: username})
    response.json(recipes.map(recipe => recipe.toJSON()))
})


app.get('/api/users/:username/savedrecipes', async (request, response) => {
    const username = request.params.username
    const user = users.find(user => user.username === username)
    const recipes = await Recipe.find().where('_id').in(user.saved);
    response.json(recipes.map(recipe => recipe.toJSON()))
})


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

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
