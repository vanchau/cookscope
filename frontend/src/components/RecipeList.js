import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Card, CardColumns } from 'react-bootstrap'
import axios from 'axios'
import '../css/RecipeList.css'

const RecipeList = () => {

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
    <CardColumns>
      {recipes.map(recipe => (
        <Card
          key={recipe.id}
          onClick={() => history.push(`/recipe/${recipe.id}`)}
        >
          <Card.Body>
            <Card.Img
              src={(recipe.imageUrl)} />
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>
							by <a className='card-author' href='#action' >{recipe.author}</a>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  )
}
export default withRouter(RecipeList)