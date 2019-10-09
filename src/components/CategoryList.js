import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../css/CategoryList.css'

const alertClicked = () => {
  alert('You clicked the third ListGroupItem');
}

export const CategoryList = () => (
	<ListGroup variant="flush">
  	<ListGroup.Item active>All</ListGroup.Item>
		<ListGroup.Item action onClick={alertClicked}> Appetizers</ListGroup.Item>
		<ListGroup.Item>Beef</ListGroup.Item>
		<ListGroup.Item>Breads</ListGroup.Item>
		<ListGroup.Item>Budget friendly</ListGroup.Item>
		<ListGroup.Item>Casseroles</ListGroup.Item>
		<ListGroup.Item>Chicken</ListGroup.Item>
		<ListGroup.Item>Dinner</ListGroup.Item>
		<ListGroup.Item>Desserts</ListGroup.Item>
		<ListGroup.Item>Fish</ListGroup.Item>
		<ListGroup.Item>Healthy</ListGroup.Item>
		<ListGroup.Item>Kid friendly</ListGroup.Item>
		<ListGroup.Item>Pasta</ListGroup.Item>
		<ListGroup.Item>Pork</ListGroup.Item>
		<ListGroup.Item>Salads</ListGroup.Item>
		<ListGroup.Item>Slow cooker</ListGroup.Item>
		<ListGroup.Item>Snacks</ListGroup.Item>
		<ListGroup.Item>Soups</ListGroup.Item>
		<ListGroup.Item>Vegetable</ListGroup.Item>
	</ListGroup>
)