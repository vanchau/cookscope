/* eslint-disable react/prop-types */
import React from 'react'
import { FiClock } from 'react-icons/fi'
import { MdRestaurant } from 'react-icons/md'

import '../css/RecipeInfo.css'


const RecipeInfo = (props) => {

  const { recipe } = props

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
    <div className='info-container'>
      { recipe.categories && <div className='category-info' >{recipe.categories.join(', ')}</div>}
      <div>{recipe.difficulty}</div>
      <div><MdRestaurant className='info-logo' /> {recipe.servings}</div>
      <div><FiClock className='info-logo'/> {cookingTime()} </div>
    </div>
  )
}
export default RecipeInfo