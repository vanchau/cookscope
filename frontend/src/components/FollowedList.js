import React from 'react'
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import '../css/FollowedList.css'

const FollowedList = (props) => {
	const { followed } = props
 
  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
			{followed.map(user => (
      <Card className='followed-card' >
        <Card.Body>
					<img className='followed-card-img rounded-circle' alt='' src={`.${user.profilePicture}`}></img>
					<React.Fragment className="followed-info">
					<Card.Title className='followed-title'>{user.name}</Card.Title>
					<Card.Text className='followed-username'>{'@'+user.username}</Card.Text>
					</React.Fragment>
        </Card.Body>
			</Card>
				))}
    </React.Fragment>
  )
}

export default withRouter(FollowedList)
