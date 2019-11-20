import React from 'react'
import ReactStars from 'react-stars'
import '../css/StarRating.css'

const StarRating = (props) => {

  const {
    starEditing,
    rating,
    setRating,
    starHalves
  } = props

  const handleStarClick = (nextValue) => {
    setRating(nextValue)
  }

  return (
    <form className='row star-rating'>
      <ReactStars className='stars' color2='#FBB117' color1='LightGrey' edit={starEditing} half={starHalves} count={5} value={rating} onChange={handleStarClick}/>
      <div className='rating'>{rating}</div>
    </form>
  )
}

export default StarRating