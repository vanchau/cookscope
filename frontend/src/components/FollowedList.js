/* eslint-disable react/prop-types */
import React from 'react'
import { Card } from 'react-bootstrap'
import { withRouter, useHistory } from 'react-router-dom'
import '../css/FollowedList.css'

const FollowedList = (props) => {
  const { following } = props
  let history = useHistory()

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      {following.map(user => (
        <Card className='followed-card' key={user.username} onClick={() => history.push(`/user/${user.username}`)}>
          <Card.Body>
            <img className='followed-card-img rounded-circle' alt='' src={`/assets/profilePictures/${user.profilePicture}`}></img>
            <div className='followed-info'>
              <Card.Title className='followed-title'>{user.username}</Card.Title>
              <Card.Text className='followed-username'>{'@'+user.username}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}
    </React.Fragment>
  )
}

export default withRouter(FollowedList)
