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
      <ReactStars className='stars' color2='#FBB117' color1='LightGrey' edit={starEditing} half={starHalves} count={5} value={Math.round(rating*2)/2} onChange={submitRating}/>
      <div className='rating'>{isNaN(rating) ? 0 : rating}</div>
    </div>
  )
}

export default StarRating