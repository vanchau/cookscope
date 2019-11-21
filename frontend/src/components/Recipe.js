import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/Recipe.css'
import StarRating from './StarRating'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'


const Recipe = (props) => {

  const [isBookmarked, setIsBookmarked] = useState(true)

  const loggedUser = localStorage.getItem('username')
  const userToken = localStorage.getItem('token')
  const userId = localStorage.getItem('id')

  const {
    setRating,
    rating
  } = props

  const voters = 123

  const handleClick = () => {
    isBookmarked ? setIsBookmarked(false) : setIsBookmarked(true)
  }

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
            {(loggedUser && isBookmarked) && <FaBookmark size={35} className='bookmark' onClick={handleClick}/>}
            {(loggedUser && !isBookmarked) && <FaRegBookmark size={35} className='bookmark' onClick={handleClick}/>}
            {!loggedUser && <OverlayTrigger
                  placement={'right'}
                  overlay={<Tooltip id={'tooltip'}>You must log in to bookmark recipe.</Tooltip>}>
                  <div>
                  <FaRegBookmark size={35} className='bookmark' onClick={handleClick}/> 
                  </div>
                </OverlayTrigger>
            }    
            <Card.Title className='recipe-card-title' style={{ textDecoration: 'none' }} >{recipe.title}</Card.Title>
          <Card.Text>
						by <Link className='card-author' to={`/user/${recipe.author}`}>{recipe.author}</Link>
          </Card.Text>
          <div className='row recipe-star-ratings'>
              <div className='single-rating'>
                <StarRating starEditing={false} starHalves={true} rating={rating+0.5} setRating={setRating}/> 
                <div className='rating-by'>{voters} ratings</div>
              </div>
              {
                loggedUser &&
                <div className='single-rating'>
                  <StarRating starEditing={true} starHalves={false} rating={rating} setRating={setRating}/> 
                  <div className='rating-by'>You</div>
                </div>
              }
          </div>
          <Card.Img className='recipe-card-img' src={`data:image/jpeg;base64,${recipe.imageFile}`} />
          {recipe.description && <Card.Text>{'"' + recipe.description+'"'}</Card.Text>}
          <Card.Title className='recipe-lesser-title'>
            <br/>Ingredients<br/>
          </Card.Title>
          {recipe.ingredients.map(ingredient =>
            <Card.Text key={ingredient.ingredient}>{ingredient.ingredient}</Card.Text>)
          }
          <Card.Title className='recipe-lesser-title'>
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



