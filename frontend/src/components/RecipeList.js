import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import StarRating from './StarRating'
import { getRecipeRating } from './api'
import '../css/RecipeList.css'

const RecipeList = (props) => {

  const {
    searchWords, 
    selectedCategories, 
    selectedDifficulties,
    selectedTimes,
    selectedDiets
    } = props

  const [recipes, setData] 	= useState([])

  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = '/api/recipes'
      const result = await axios(baseUrl, {params: { 
        searchWords: searchWords, 
        selectedCategories: selectedCategories,
        selectedDifficulties: selectedDifficulties,
        selectedTimes: selectedTimes,
        selectedDiets: selectedDiets 
        }})
      setData(result.data)
    }
    fetchData()
  }, [
    searchWords,
    selectedCategories,
    selectedDifficulties,
    selectedTimes,
    selectedDiets
   ])

  
  return (
    <div>
      {searchWords.length > 0 ? <h2>"{searchWords.join(" ")}": {recipes.length} recipes found</h2> : <></>}
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
              
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default withRouter(RecipeList)