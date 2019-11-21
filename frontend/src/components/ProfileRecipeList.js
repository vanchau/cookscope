/* eslint-disable react/prop-types */
import React from 'react'
import '../css/ProfileRecipeList.css'
import ProfileRecipeCard from './ProfileRecipeCard'


const ProfileRecipeList = (props) => {
  const { recipes } = props

  return (
    <div className='recipe-list-container'>
      {recipes.map(recipe => (
        <ProfileRecipeCard recipe={recipe} />
      ))}
    </div>
  )
}

export default ProfileRecipeList
