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

let users = [
    {
        "username": "bobster",
        "name": "Bob Bobson",
        "profilePicture": "./assets/dummy/bobster.PNG"
    }
]

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
        "imageUrl": "./assets/dummy/cherry-roulade.jpg",
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
        "imageUrl": "./assets/dummy/artesan-bread.jpg",
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
        "imageUrl": "./assets/dummy/pasta-pesto.jpg",
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
        "imageUrl": "./assets/dummy/goulash-soup.jpg",
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
        "imageUrl": "./assets/dummy/vanilla-bun.jpg",
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
        "imageUrl": "./assets/dummy/thai-noodle.jpg",
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
        "imageUrl": "./assets/dummy/eclair.jpg",
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})