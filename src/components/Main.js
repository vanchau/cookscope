import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/Main.css'
import dummyData from '../assets/dummy/recipes.json'

// THIS IS A TEMPORARY SOLUTION...
import cookieImg from '../assets/dummy/cookie.jpg'
import pizzaImg from '../assets/dummy/pizza.jpg'
import garlicImg from '../assets/dummy/garlic_shrimp.jpg'

export const Main = () => {

	return (
		<div style={{ flex: '5' }} >
			{dummyData.recipes.map(recipe => (
			<Card key={recipe.recipeID} style={{ width: '30rem', height: '18rem', alignItems: 'center', marginBottom: '30px' }}>
				<Card.Img 
					style={{ opacity: 0.3, maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
					variant="top"
					src={(recipe.imageUrl === 'cookieImg') 
						? cookieImg 
						: ((recipe.imageUrl === 'pizzaImg') 
						? pizzaImg 
						: garlicImg)} />
				<Card.ImgOverlay>
					<div>
						<Card.Title style={{ color: '#3C3C3C' }}>{recipe.title}</Card.Title>
						<Card.Text style={{ color: '#3C3C3C' }}>by {recipe.author}</Card.Text>
					</div>
					<Button variant="recipe-button" style={{ marginLeft: '70%', marginTop: '140px' }} >View recipe</Button>
				</Card.ImgOverlay>
			</Card>
			))}
		</div>
	)
}