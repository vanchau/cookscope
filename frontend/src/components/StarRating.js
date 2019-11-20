import React from 'react'
import ReactStars from 'react-stars'
import '../css/StarRating.css'

const StarRating = (props) => {

  const {
    starEditing,
    rating,
    starHalves,
    submitRating
  } = props

  return (
    <div className='row star-rating'>
      <ReactStars className='stars' color2='#FBB117' color1='LightGrey' edit={starEditing} half={starHalves} count={5} value={rating} onChange={submitRating}/>
      <div className='rating'>{rating}</div>
    </div>
  )
}

export default StarRating