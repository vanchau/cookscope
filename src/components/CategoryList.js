import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../css/CategoryList.css'

const alertClicked = () => {
  alert('You clicked the third ListGroupItem');
}

export const CategoryList = () => (
	<ListGroup variant="flush" style={{ flex: '2', border: '1px solid #DFDFDF', padding: '20px', marginRight: '40px' }}>
		<h5 style={{ color: '#3C3C3C' }} >Categories</h5>
  	<ListGroup.Item active>All</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}> Appetizers</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Beef</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Breads</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Budget friendly</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Casseroles</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Chicken</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Dinner</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Desserts</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Fish</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Healthy</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Kid friendly</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Pasta</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Pork</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Salads</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Slow cooker</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Snacks</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Soups</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}>Vegetable</ListGroup.Item>
	</ListGroup>
)