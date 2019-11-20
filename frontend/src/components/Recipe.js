import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/Recipe.css'
import StarRating from './StarRating'

const Recipe = (props) => {

  const loggedUser = localStorage.getItem('username')
  const userToken = localStorage.getItem('token')
  const userId = localStorage.getItem('id')

  const {
    setRating,
    rating
  } = props

  const voters = 123

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
          <Card.Title style={{ textDecoration: 'none' }} >{recipe.title}</Card.Title>
          <Card.Text>
						by <Link className='card-author' to={`/user/${recipe.author}`}>{recipe.author}</Link>
          </Card.Text>
          <div className='row recipe-star-ratings'>
              <div className='single-rating'>
                <StarRating starEditing={false} starHalves={true} rating={rating+0.5} setRating={setRating}/> 
                <div className='rating-by'>{voters} ratings</div>
              </div>
              {
              (loggedUser !== null) ?
                <div className='single-rating'>
                  <StarRating starEditing={true} starHalves={false} rating={rating} setRating={setRating}/> 
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


