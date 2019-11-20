import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/Recipe.css'
import StarRating from './StarRating'
import { postRating } from './api'

const Recipe = (props) => {

  const loggedUser = localStorage.getItem('username')
  const userId = localStorage.getItem('id')


  const { recipeID } = useParams()
  const [recipe, setRecipe] = useState({ ingredients: [], instructions: [], ratings: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/recipes/${recipeID}`)
      setRecipe(result.data)
    }
    fetchData()
  }, [recipeID])

  const submitRating = (value) => {
    const rating = {userId: userId, rating: value}
    postRating(rating, recipeID)
  }

  const calculateRating = () => {
    const a = recipe.ratings.map(rating => rating.rating).reduce((acc, curr) => acc + curr)
    return a
  }

  const ownRating = () => {
    console.log(recipe.ratings.find(rating => rating.userId === userId).rating)
    return recipe.ratings.find(rating => rating.userId === userId).rating
  }

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='recipe-card'>
        <Card.Body>
          <Card.Title style={{ textDecoration: 'none' }} >{recipe.title}</Card.Title>
          <Card.Text>
						by <Link className='card-author' to={`/user/${recipe.author}`}>{recipe.author}</Link>
          </Card.Text>
          <div className='row recipe-star-ratings'>
              <div className='single-rating'>
                <StarRating starEditing={false} starHalves={true} rating={calculateRating} submitRating={submitRating}/> 
                <div className='rating-by'>{recipe.ratings.length} ratings</div>
              </div>
              {
              (loggedUser !== null) ?
                <div className='single-rating'>
                  <StarRating starEditing={true} starHalves={false} rating={ownRating} submitRating={submitRating}/> 
                  <div className='rating-by'>You</div>
                </div>
                :
                <></>
              }
          </div>
          <Card.Img className='recipe-card-img' src={`data:image/jpeg;base64,${recipe.imageFile}`} />
          {recipe.description && <Card.Text>{'"' + recipe.description+'"'}</Card.Text>}
          <Card.Title>
            <br/>Ingredients<br/>
          </Card.Title>
          {recipe.ingredients.map(ingredient =>
            <Card.Text key={ingredient.ingredient}>{ingredient.ingredient}</Card.Text>)
          }
          <Card.Title>
            <br/>Steps<br/>
          </Card.Title>
          {recipe.instructions.map((instruction, i) => (
            <Card.Text key={instruction.id}>
              {i + 1}{`. ${instruction.instruction}`}<br/>
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Recipe


