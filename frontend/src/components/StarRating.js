import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const StarRating = (props) => {

  const {
    starEditing,
    rating,
    setRating
  } = props

  const handleStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue)
  }

  return (
    <form >
      <StarRatingComponent emptyStarColor='LightGrey' editing={starEditing} starCount={5} name='rate1' value={rating} onStarClick={handleStarClick}/>
    </form>
  )
}

export default StarRating