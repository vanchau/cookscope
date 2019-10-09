import React from 'react';
import { Card, Button } from 'react-bootstrap';
import pizza from '../assets/pizza.jpg'
import '../css/Main.css'

export const Main = () => (
	<Card style={{ width: '35rem', height: '18rem', flex: '7' }}>
		<Card.Img style={{ opacity: 0.5, width: '35rem', height: '18rem' }} variant="top" src={pizza} />
		<Card.ImgOverlay>
			<Card.Title>Basic Pepperoni Pizza</Card.Title>
			<Card.Text>
				by LiveForPizza
			</Card.Text>
			<Button variant="recipe-button">View recipe</Button>
		</Card.ImgOverlay>
	</Card>
)