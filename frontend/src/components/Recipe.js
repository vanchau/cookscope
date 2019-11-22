/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Card, Form, Button, NavDropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import ReportWindow from './ReportWindow'
import Spinner from './Spinner'
import '../css/Recipe.css'
import StarRating from './StarRating'
import { postComment, fetchComments, postRating, getRecipe, removeRecipe, getRecipeRating, getOwnRating, getIsBookmarked, postBookmark } from '../api'
import RecipeInfo from './RecipeInfo'

const Recipe = () => {
  let history = useHistory()
  const loggedUser = localStorage.getItem('username')
  const userToken = localStorage.getItem('token')
  const userId = localStorage.getItem('id')
  const { recipeID } = useParams()
  const [recipe, setRecipe] = useState({ imageFile: '', author: '', ingredients: [], instructions: [], ratings: [] })
  const [recipeRating, setRecipeRating] = useState(0)
  const [ownRating, setOwnRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [comment, insertComment] = useState({ comment: '' })
  const [comments, setComments] = useState([])
  const [isAuthor, setIsAuthor] = useState(false)
  const [showReportWindow, setShowReportWindow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    insertComment({ comment: '' })
    const fetchData = async () => {
      try {
        const recipeData = await getRecipe(recipeID)
        const ratingData = await getRecipeRating(recipeID)
        const commentData = await fetchComments(recipeID)

        setRecipe(recipeData)
        setRatingCount(recipeData.ratings.length)
        setRecipeRating(ratingData.rating)
        setComments(commentData)
        setIsLoading(false)
        if (userId === recipeData.authorID) {
          setIsAuthor(true)
        }
        if (userToken) {
          setLoggedIn(true)
          const ownRatingData = await getOwnRating(recipeID, userId)
          const bookmarkData = await getIsBookmarked(recipeID, loggedUser)
          setOwnRating(ownRatingData.rating)
          setIsBookmarked(bookmarkData.isBookmarked)
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [recipeID, ownRating, userId, loggedUser, userToken])

  const submitRating = (value) => {
    const rating = {userId: userId, rating: value}
    postRating(rating, recipeID, userId)
    setOwnRating(value)
  }

  const handleClick = () => {
    postBookmark(recipeID, loggedUser, isBookmarked)
    setIsBookmarked(!isBookmarked)
  }


  useEffect(() => {

  }, [showReportWindow])

  const handleCommentChange = (event) => {
    insertComment({ comment: event.target.value })
  }

  const deleteRecipe = async () => {
    const token = localStorage.getItem('token')
    const result = await removeRecipe(token, recipeID)
    if (result.ok) {
      await history.push('/')
      window.location.reload()
    } else {
      alert('There was a problem. Try again later.')
    }
  }

  const submitComment = async () => {
    const token = localStorage.getItem('token')
    await postComment(token, recipeID, comment)

    insertComment({ comment: '' })
    fetchComments(recipeID)
    setComments(comments)
  }

  return (
    <React.Fragment>
        {isLoading ? 
        (
          <Spinner/>
        ) :
        (
          <div style={{height:'auto', background:'transparent'}}> 
          <div style={{height:'2em', background:'transparent'}} />
          <Card className='recipe-card'>
            <Card.Body>
              <div className='menu'>
              <NavDropdown title={<FiMenu className='menu-icon'/>} >
                <NavDropdown.Item onClick={() => setShowReportWindow(true)} style={{ color: 'red' }} >Report</NavDropdown.Item>
                {isAuthor && <NavDropdown.Item onClick={deleteRecipe}>Delete recipe</NavDropdown.Item>}
              </NavDropdown>
              {(loggedUser && isBookmarked) && <FaBookmark size={28} className='bookmark' onClick={handleClick}/>}
              {(loggedUser && !isBookmarked) && <FaRegBookmark size={28} className='bookmark' onClick={handleClick}/>}
              {!loggedUser && <OverlayTrigger
                placement={'right'}
                overlay={<Tooltip id={'tooltip'}>You must log in to bookmark recipe.</Tooltip>}>
                <div>
                  <FaRegBookmark size={28} className='bookmark' onClick={handleClick}/>
                </div>
              </OverlayTrigger>
              }
            </div>
            <Card.Title className='recipe-card-title' style={{ textDecoration: 'none', cursor:'default' }} >{recipe.title}</Card.Title>
            <Card.Text>
                by <Link className='card-author' to={`/user/${recipe.author}`}>{recipe.author}</Link>
            </Card.Text>
            <div className='row recipe-star-ratings'>
              <div className='single-rating'>
                <StarRating starEditing={false} starHalves={true} rating={recipeRating} submitRating={submitRating}/>
                <div className='rating-by'>{ratingCount} ratings</div>
              </div>
              {
                loggedUser &&
                <div className='single-rating'>
                  <StarRating starEditing={true} starHalves={false} rating={ownRating} submitRating={submitRating}/>
                  <div className='rating-by'>You</div>
                </div>
              }
            </div>
            <Card.Img className='recipe-card-img' src={`data:image/jpeg;base64,${recipe.imageFile}`} />
            <br/>{recipe.description && <Card.Text>{'"' + recipe.description+'"'}</Card.Text>}
            <br/>
            <RecipeInfo recipe={recipe}/>
            <Card.Title className='recipe-lesser-title' style={{textDecoration: 'none', cursor:'default'}} >
              <br/>Ingredients<br/>
            </Card.Title>
            {recipe.ingredients.map(ingredient => 
              <div className='row' style={{minHeight:'2.2em'}}  key={ingredient.ingredient}>
                <Card.Text style={{marginLeft:'1em', marginRight:'2em', width: '4em'}}>{ingredient.amount + ' '}</Card.Text>
                <Card.Text> {ingredient.ingredient}</Card.Text>
              </div>)}  
            <Card.Title className='recipe-lesser-title' style={{textDecoration: 'none', cursor:'default'}}>
              <br/>Steps<br/>
            </Card.Title>
            {recipe.instructions.map((instruction, i) => (
              <Card.Text key={instruction.id}>
                {i + 1}{`. ${instruction.instruction}`}<br/>
              </Card.Text>
            ))}

            <hr style={{ margin: '3em 0 1em 0'}} />

            <Card.Title className='sub-title' style={{ textDecoration: 'none', cursor:'default' }} >
                Comments ({comments.length})
            </Card.Title>

            {isLoggedIn &&
                <Form className='comment-container' style={{ margin: '1rem 0' }} onSubmit={submitComment}>
                  <Form.Control
                    as='textarea'
                    rows='2'
                    onChange={handleCommentChange}
                    name='comment'
                    placeholder='Leave a comment'
                  />
                  <div className='text-right'>
                    <Button className='post-button' variant='none' type='submit' >Post</Button>
                  </div>
                </Form>
              }
              {comments.map((comment, i) => (
                <Card key={`comment-${i}`} style={{ width: '100%', margin: '1em 0' }}>
                  <Card.Body className='comment'>
                    <p className='comment-header' >
                      <Link className='card-author comment-author' to={`/user/${comment.poster}`}>
                        {comment.poster}
                      </Link>
                      <span className='comment-date' >{comment.date}</span></p>
                    <Card.Text className='comment-body recipe-text' >{comment.comment}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <ReportWindow
                show={showReportWindow}
                handleClose={() => setShowReportWindow(false)}
                recipeID={recipeID}
                reporterID={localStorage.getItem('id')}
              />
            </Card.Body>
          </Card>
        </div>
          )}
    </React.Fragment>
  )
}

export default Recipe


