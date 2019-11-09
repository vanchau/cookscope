import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/Recipe.css'

const Recipe = () => { 
  const { recipeID } = useParams()
  const [recipe, setRecipe] = useState({ ingredients: [], instructions: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/recipes/${recipeID}`)
      setRecipe(result.data)
    }
    fetchData()
  }, [recipeID])

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='recipe-card'>
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>
            by <a className='card-author' href='#action' >{recipe.author}</a>
          </Card.Text>
          <Card.Img className='recipe-card-img' src={`data:image/jpeg;base64,${recipe.imageFile}`} />
          <Card.Text>{'"'+recipe.description+'"'}</Card.Text>
          <Card.Title>
            <br/>Ingredients<br/>
          </Card.Title>
          {recipe.ingredients.map(ingredient =>
            <Card.Text key={ingredient.ingredient}>{ingredient.ingredient}</Card.Text>)
          }
          <Card.Title>
            <br/>Instructions<br/>
          </Card.Title>
          {recipe.instructions.map(instruction => (
            <Card.Text key={instruction.id}>
              {instruction.id}{`. ${instruction.instruction}`}<br/>
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Recipe
