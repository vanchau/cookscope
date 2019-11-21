import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import '../css/Recipe.css'
import StarRating from './StarRating'
import RecipeInfo from './RecipeInfo'
import { postRating, getRecipe, getRecipeRating, getOwnRating } from './api'

const Recipe = () => {

  const loggedUser = localStorage.getItem('username')
  const userId = localStorage.getItem('id')

  const { recipeID } = useParams()
  const [recipe, setRecipe] = useState({ ingredients: [], instructions: [], ratings: [] })
  const [recipeRating, setRecipeRating] = useState(0)
  const [ownRating, setOwnRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  
  useEffect(() => {
    const fetchData = () => {
      getRecipe(recipeID).then((result) => {
        setRecipe(result)
        setRatingCount(result.ratings.length)
      })
      getRecipeRating(recipeID).then((result) => {
        setRecipeRating(result.rating)
      })
      getOwnRating(recipeID, userId).then((result) => {
        setOwnRating(result.rating)
      })
    }
    fetchData()
  }, [recipeID, ownRating])
  
  const submitRating = (value) => {
    const rating = {userId: userId, rating: value}
    postRating(rating, recipeID, userId)
    setOwnRating(value)
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
                <StarRating starEditing={false} starHalves={true} rating={recipeRating} submitRating={submitRating}/> 
                <div className='rating-by'>{ratingCount} ratings</div>
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
          <RecipeInfo recipe={recipe}/>
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


