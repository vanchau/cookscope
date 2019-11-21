/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import '../css/RecipeList.css'
import RecipeCard from './RecipeCard'

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
      {searchWords.length > 0 ? <h2>&quot;{searchWords.join(' ')}&quot;: {recipes.length} recipes found</h2> : <></>}
      <div className='recipe-list-card-columns'>
        {recipes.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe.id}/>
        ))}
      </div>
    </div>
  )
}
export default withRouter(RecipeList)