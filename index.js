const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

let recipes = [
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
        "imageUrl": "./assets/dummy/cookie.jpg",
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
        "imageUrl": "./assets/dummy/pizza.jpg",
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
        "imageUrl": "./assets/dummy/garlic_shrimp.jpg",
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
        "imageUrl": "./assets/dummy/salad.jpg",
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
        "imageUrl": "./assets/dummy/pancake.jpg",
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
        "imageUrl": "./assets/dummy/salmon.jpg",
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
        "imageUrl": "./assets/dummy/sandwich.jpg",
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
        "imageUrl": "./assets/dummy/chicken-soup.jpg",
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

app.get('/api/recipes', (req, res) => {
    res.json(recipes)
})

app.get('/api/recipes/:id', (req, res) => {
    const id = Number(req.params.id)
    const recipe = recipes.find(recipe => recipe.id === id)
    if (recipe) {
        res.json(recipe)
    }
    else {
        res.status(404).end()
    }
})

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})