import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import ProfileRecipeList from './ProfileRecipeList'
import '../css/UserProfile.css'
import { getUserInfo, getRecipes, getBookmarkedRecipes } from '../api'

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({ username: '', profilePicture: '', followed: [], following: [], bookmarks: [] })
  const [ownRecipes, setOwnRecipes] = useState([])
  const [bookmarkedRecipes, setBookmarkedRecipes]	= useState([])

  useEffect(() => {
    const fetchData = () => {
      getUserInfo(username).then(result => {
        setUser(result)
      })
      getRecipes(username).then(result => {
        setOwnRecipes(result)
      })

      const token = localStorage.getItem('token')

      if (token) {
        getBookmarkedRecipes(token, username).then(result => {
          setBookmarkedRecipes(result)
        })
      }
    }
    fetchData()
  }, [username])

  const setPicture = () => {
    if (user.profilePicture === '') {
      return '/assets/profilePictures/anonymous.png'
    }
    else {
      return `data:image/jpeg;base64,${user.profilePicture}`
    }
  }

  return (  
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='profile-card' >
        <Card.Body>
          <img className='profile-card-img rounded-circle' alt='' src={setPicture()}></img>
          <Card.Title className='profile-title'>{user.username}</Card.Title>
          <Tabs className='profile-tabs'>
            <Tab className='profile-tab' eventKey={1} title={`Recipes (${ownRecipes.length})`}>
              <ProfileRecipeList recipes={ownRecipes} />
            </Tab>
            <Tab className='profile-tab' eventKey={2} title={`Bookmarked (${bookmarkedRecipes.length})`}>
              <ProfileRecipeList recipes={bookmarkedRecipes} />
            </Tab>
            {/*<Tab className='profile-tab test' eventKey={3} title={`Following (${following.length})`}>
              <FollowedList following={following} />
            </Tab>*/}
          </Tabs>
        </Card.Body>
      </Card>
      <div style={{background:'transparent', height: '20em'}}/>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
