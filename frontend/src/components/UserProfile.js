import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import ProfileRecipeList from './ProfileRecipeList'
import FollowedList from './FollowedList'
import '../css/UserProfile.css'
import { getUserInfo, getOwnRecipes, getBookmarkedRecipes, getFollowingUsers } from '../components/api'

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({ username: '', name: '', profilePicture: ''})
  const [ownRecipes, setOwnRecipes] 	= useState([])
  const [bookmarkedRecipes, setBookmarkedRecipes] 	= useState([])
  const [following, setFollowingUsers] 	= useState([])

  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem('token')
      getUserInfo(token).then(result => {
        setUser(result)
      })
      getOwnRecipes(token).then(result => {
        setOwnRecipes(result)
      })
      getBookmarkedRecipes(token).then(result => {
        setBookmarkedRecipes(result)
      })
      getFollowingUsers(token).then(result => {
        setFollowingUsers(result)
      })
    }
    fetchData()
  }, [username])

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='profile-card' >
        <Card.Body>
          <img className='profile-card-img rounded-circle' alt='' src={`/assets/profilePictures/${user.profilePicture}`}></img>
          <Card.Title className='profile-title'>{user.username}</Card.Title>
          <Card.Text className='profile-username'>{'@'+user.username}</Card.Text>
          <Tabs className='profile-tabs'>
            <Tab className='profile-tab' eventKey={1} title='My Recipes'>
              <ProfileRecipeList recipes={ownRecipes} />
            </Tab>
            <Tab className='profile-tab' eventKey={2} title='Bookmarked Recipes'>
              <ProfileRecipeList recipes={bookmarkedRecipes} />
            </Tab>
            <Tab className='profile-tab test' eventKey={3} title='Following'>
              <FollowedList following={following} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
