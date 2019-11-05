import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/UserProfile.css'
 

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({ username: '', name: '', profilePicture: ''})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/${username}`)
			setUser(result.data)
			console.log(result.data)
    }
    fetchData()
	}, [username])
	
	console.log(user)

 
  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='profile-card' >
        <Card.Body>
					<img className='profile-card-img rounded-circle' src={`.${user.profilePicture}`}></img>
					<Card.Title className='profile-title'>{user.name}</Card.Title>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default UserProfile
