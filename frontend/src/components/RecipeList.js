import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { Card, CardGroup } from 'react-bootstrap'
import axios from 'axios'
import StarRating from './StarRating'
import '../css/RecipeList.css'

const RecipeList = (props) => {

  const {
    rating,
    setRating
  } = props

  const [recipes, setData] 	= useState([])
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = '/api/recipes'
      const result = await axios(baseUrl)
      setData(result.data)
    }
    fetchData()
  }, [])

  return (
    <div className='recipe-list-card-columns'>
      {recipes.map(recipe => (
        <Card
          className='recipe-list-card'
          key={recipe.id}
        >
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
            <StarRating starEditing={false} rating={rating} setRating={setRating}></StarRating>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
export default withRouter(RecipeList)