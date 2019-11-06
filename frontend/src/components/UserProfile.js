import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import ProfileRecipeList from './ProfileRecipeList'
import '../css/UserProfile.css'

const UserProfile = () => {
  const { username } = useParams()
	const [user, setUser] = useState({ username: '', name: '', profilePicture: ''})
	const [ownRecipes, setOwnRecipes] 	= useState([])
	const [savedRecipes, setSavedRecipes] 	= useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/${username}/ownrecipes`)
			setOwnRecipes(result.data)
    }
    fetchData()
	}, [username])

	useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/${username}/savedrecipes`)
			setSavedRecipes(result.data)
    }
    fetchData()
	}, [username])
	
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/${username}`)
			setUser(result.data)
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
						<Tab className='profile-tab' eventKey={1} title="Own Recipes">
						<ProfileRecipeList recipes={ownRecipes} />
						</Tab>
						<Tab className='profile-tab' eventKey={2} title="Saved Recipes">
						<ProfileRecipeList recipes={savedRecipes} />
						</Tab>
						<Tab className='profile-tab test' eventKey={3} title="Followed">
							Gordon
						</Tab>
					</Tabs>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
