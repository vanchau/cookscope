import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import '../css/userProfile.css'
import { users } from '../assets/dummy/users.json'
 
const UserProfile = () => {
  const { username } = useParams()
  const [profile, setProfile] = useState({ follows: [], ownRecipes: [], savedRecipes: [], settings: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/users/${username}`)
      setProfile(result.data)
    }
    fetchData()
  }, [username])

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card>
        <Card.Body>
          <Card.Img src={`.${user.profilePicture}`} />
					<Card.Title>nimi</Card.Title>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default UserProfile
