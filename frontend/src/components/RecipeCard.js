import React, { useState, useEffect } from 'react'
import { getRecipeRating } from './api'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import StarRating from './StarRating'

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
							<StarRating starEditing={false} starHalves={true} rating={rating}/> 
                <div className='rating-by'>{recipe.ratings.length} ratings</div> 
            </Card.Body>
    </Card>
	)
}

export default withRouter(RecipeCard)