require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');

app.use(express.static('build'))
//app.use(bodyParser.json())
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
        console.log("recipe saved to db!")
    })

})

app.get('/api/recipes', (request, response) => {
    Recipe.find({}).then(recipes => {
      response.json(recipes.map(recipe => recipe.toJSON()))
    });
})

app.get('/api/recipes/:id', (request, response) => {
    Recipe.findById(request.params.id).then(recipe => {
      response.json(recipe.toJSON())
    })
})

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
