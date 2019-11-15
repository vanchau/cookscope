import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import ProfileRecipeList from './ProfileRecipeList'
import FollowedList from './FollowedList'
import '../css/UserProfile.css'
import { getUserInfo, getOwnRecipes } from '../components/api'

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({ username: '', name: '', profilePicture: ''})
  const [ownRecipes, setOwnRecipes] 	= useState([])
  const [savedRecipes, setSavedRecipes] 	= useState([])
  const [followed, setFollowed] 	= useState([])

  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem('token')

      //const user = await axios(`/api/users/${username}`)
      getUserInfo(token).then(result => {
        console.log('userinfo', result)
        setUser(result)
      })
      //const savedRecipes = await axios(`/api/users/${username}/savedrecipes`)
      getOwnRecipes(token).then(result => {
        console.log('own recipes', result)
        setOwnRecipes(result)
      })
      //const followed = await axios(`/api/users/${username}/followed`)
      //setUser(user.data)
      //setSavedRecipes(savedRecipes.data)
      //setOwnRecipes(ownRecipes.data)
      //setFollowed(followed.data)
    }
    fetchData()
  }, [username])

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='profile-card' >
        <Card.Body>
          <img className='profile-card-img rounded-circle' alt='' src={`.${user.profilePicture}`}></img>
          <Card.Title className='profile-title'>{user.name}</Card.Title>
          <Card.Text className='profile-username'>{'@'+user.username}</Card.Text>
          <Tabs className='profile-tabs'>
            <Tab className='profile-tab' eventKey={1} title='Own Recipes'>
              <ProfileRecipeList recipes={ownRecipes} />
            </Tab>
            <Tab className='profile-tab' eventKey={2} title='Saved Recipes'>
              <ProfileRecipeList recipes={savedRecipes} />
            </Tab>
            <Tab className='profile-tab test' eventKey={3} title='Followed'>
              <FollowedList followed={followed} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
