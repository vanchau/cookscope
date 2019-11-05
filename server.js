require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
// HTTP request logger middleware
app.use(morgan('dev'));

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const recipeSchema = new mongoose.Schema({
  title: String,
  instruction: String,
  author: String,
  ingredients: [String],
  difficulty: String,
  portion: String,
  imageUrl: String,
  direction: [{id: Number, step: String, text: String}]
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

app.get('/api/recipes', (request, response) => {
    Recipe.find({}).then(recipes => {
      response.json(recipes.map(recipe => recipe.toJSON()))
    });
});

app.get('/api/recipes/:id', (request, response) => {
    Recipe.findById(request.params.id).then(recipe => {
      response.json(recipe.toJSON())
    })
})

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
/* let recipes = [
    {
        "id": 1,
        "title": "Pecan Cookie Drops",
        "instruction": "Yum yum",
        "author": "cookie monster",
        "ingredients": [
            "pecan",
            "butter",
            "flour",
            "sugar",
            "water"
        ],
        "difficulty": "easy",
        "portion": "4",
        "imageUrl": "/assets/dummy/cookie.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 2,
        "title": "Basic Pepperoni Pizza",
        "instruction": "Yum yum",
        "author": "LiveForPizza",
        "ingredients": [
            "pecan",
            "butter",
            "flour",
            "sugar",
            "water"
        ],
        "difficulty": "easy",
        "portion": "4",
        "imageUrl": "/assets/dummy/pizza.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 3,
        "title": "Easy Garlic Shrimp",
        "instruction": "Yum yum",
        "author": "Bobba",
        "ingredients": [
            "garlic",
            "shrimp",
            "red pepper",
            "salt",
            "olive oil"
        ],
        "difficulty": "medium",
        "portion": "2",
        "imageUrl": "/assets/dummy/garlic_shrimp.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 4,
        "title": "Mediterranean salad",
        "instruction": "Yum yum",
        "author": "VaSoukas",
        "ingredients": [
            "red onion",
            "lettuce",
            "cucumber",
            "olive",
            "tomato"
        ],
        "difficulty": "easy",
        "portion": "5",
        "imageUrl": "/assets/dummy/salad.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 5,
        "title": "Caramel Pancake",
        "instruction": "Yum yum",
        "author": "norali12",
        "ingredients": [
            "flour",
            "sugar",
            "egg",
            "milk",
            "caramel"
        ],
        "difficulty": "easy",
        "portion": "2",
        "imageUrl": "/assets/dummy/pancake.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 6,
        "title": "Hearty Salmon Meunière",
        "instruction": "Yum yum",
        "author": "botwcook",
        "ingredients": [
            "hearty salmon",
            "goat cheese",
            "tabantha wheat"
        ],
        "difficulty": "easy",
        "portion": "2",
        "imageUrl": "/assets/dummy/salmon.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 7,
        "title": "Club House Sandwich",
        "instruction": "Yum yum",
        "author": "Morocco76",
        "ingredients": [
            "bread",
            "bacon",
            "lettuce",
            "butter",
            "mayonaise"
        ],
        "difficulty": "medium",
        "portion": "3",
        "imageUrl": "/assets/dummy/sandwich.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 8,
        "title": "Chicken Soup with Rice",
        "instruction": "Yum yum",
        "author": "Januaryboi",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "difficult",
        "portion": "6",
        "imageUrl": "/assets/dummy/chicken-soup.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 9,
        "title": "Cherry Roulade",
        "instruction": "Yums",
        "author": "Sponchia",
        "ingredients": [
            "cherry",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "difficult",
        "portion": "15",
        "imageUrl": "/assets/dummy/cherry-roulade.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 10,
        "title": "Artesan Bread",
        "instruction": "Yum yum",
        "author": "fancyvrave1",
        "ingredients": [
            "flour",
            "water",
            "salt",
            "yeast"
        ],
        "difficulty": "easy",
        "portion": "6",
        "imageUrl": "/assets/dummy/artesan-bread.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 11,
        "title": "Pasta Pesto",
        "instruction": "Yum yum",
        "author": "fancycrave1",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "easy",
        "portion": "4",
        "imageUrl": "/assets/dummy/pasta-pesto.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 12,
        "title": "Goulash Soup",
        "instruction": "Yum yum",
        "author": "ivabalk",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "easy",
        "portion": "4",
        "imageUrl": "/assets/dummy/goulash-soup.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 13,
        "title": "Vanilla Buns",
        "instruction": "Yum yum",
        "author": "klickblick",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "medium",
        "portion": "8",
        "imageUrl": "/assets/dummy/vanilla-bun.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 14,
        "title": "Thai Fried Noodles",
        "instruction": "Yum yum",
        "author": "cattalin",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "easy",
        "portion": "2",
        "imageUrl": "/assets/dummy/thai-noodle.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    },
    {
        "id": 15,
        "title": "Éclair",
        "instruction": "Yum yum",
        "author": "karriezhu",
        "ingredients": [
            "chicken",
            "rice",
            "salt",
            "water",
            "cayenne pepper"
        ],
        "difficulty": "difficult",
        "portion": "3",
        "imageUrl": "/assets/dummy/eclair.jpg",
        "direction": [
            {
                "id": 1,
                "step": "1",
                "text": "Prepare all the ingredients.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 2,
                "step": "2",
                "text": "Take butter out of the fridge.",
                "image1": "",
                "image2": ""
            },
            {
                "id": 3,
                "step": "3",
                "text": "Mix flour with sugar.",
                "image1": "",
                "image2": ""
            }
        ]
    }

]
*/

/*
recipes.map(recipe => {
    const r = new Recipe({
        title: recipe.title,
        instruction: recipe.instruction,
        author: recipe.author,
        ingredients: recipe.ingredients,
        difficulty: recipe.difficulty,
        portion: recipe.portion,
        imageUrl: fs.readFileSync("./frontend/public"+recipe.imageUrl).toString("base64"),
        direction: recipe.direction
    })
    r.save().then(res => {
        console.log("recipe saved!")
    })
})

recipe.save().then(response => {
    console.log('recipe saved!');
})
*/

