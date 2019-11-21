/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { getRecipeRating } from '../api'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FiClock } from 'react-icons/fi'
import { GiChefToque } from 'react-icons/gi'
import StarRating from './StarRating'
import '../css/RecipeCard.css'

const RecipeCard = (props) => {
  const { recipe } = props
  const [rating, setRating] = useState(0)
  let history = useHistory()

  useEffect(() => {
    const fetchData = () => {
      getRecipeRating(recipe.id).then((result) => {
        setRating(result.rating)
      })
    }
    fetchData()
  }, [recipe])

	const cookingTime = () => {
		if (recipe.hours && recipe.minutes) {
			return (`${recipe.hours} h ${recipe.minutes} min`)
		} 
		if (!recipe.hours && recipe.minutes) {
			return (`${recipe.minutes} min`)
		} 
		return (`${recipe.hours} h`)
	}
	
	return (
		<Card className='recipe-list-card'key={recipe.id}>
            <Card.Body>
              <Card.Img
                className='recipe-list-card-img'
                src={`data:image/jpeg;base64,${recipe.imageFile}`}
                onClick={() => history.push(`/recipe/${recipe.id}`)}
              />
              <Card.Title onClick={() => history.push(`/recipe/${recipe.id}`)}>{recipe.title}</Card.Title>
              <Card.Text>
                by <Link className='card-author' to={`/user/${recipe.author}`}>{recipe.author}</Link>
              </Card.Text>
              <div className='recipe-info-container'>
                <div>
                <StarRating starEditing={false} starHalves={true} rating={rating}/> 
                  <div className='rating-by'>{recipe.ratings.length} ratings</div> 
                  </div>
                  <div className='info-text'><GiChefToque style={{marginRight:'0.2em'}} className='info-logo'/>{recipe.difficulty}</div>  
                  <div  className='info-text'><FiClock className='info-logo'/> {cookingTime()} </div>
              </div>    
            </Card.Body>
    </Card>
  )
}

export default withRouter(RecipeCard)