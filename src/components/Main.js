import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/Main.css'
import dummyData from '../assets/dummy/recipes.json'

// THIS IS A TEMPORARY SOLUTION...
import cookieImg from '../assets/dummy/cookie.jpg'
import pizzaImg from '../assets/dummy/pizza.jpg'
import garlicImg from '../assets/dummy/garlic_shrimp.jpg'

class Main extends Component {
	
	routeChange = () => {
    let path = '/recipe';
    this.props.history.push(path);
	}
	
	render() {
		return (
			<div style={{ flex: '5' }} >
			{dummyData.recipes.map(recipe => (
			<Card onClick={this.routeChange} key={recipe.recipeID} style={{ width: '35rem', height: '18rem', alignItems: 'center', marginBottom: '40px' }}>
				<Card.Img 
					style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
					variant="top"
					src={(recipe.imageUrl === 'cookieImg') 
						? cookieImg 
						: ((recipe.imageUrl === 'pizzaImg') 
						? pizzaImg 
						: garlicImg)} />
				<Card.ImgOverlay>
					<div>
						<Card.Title style={{ color: '#3C3C3C' }}>{recipe.title}</Card.Title>
						<Card.Text style={{ color: '#3C3C3C' }}>
							by <a href="#action" >{recipe.author}</a>
						</Card.Text>
					</div>
					<Button variant="recipe-button" style={{ marginLeft: '75%', marginTop: '140px' }} >View recipe</Button>
				</Card.ImgOverlay>
			</Card>
			))}
		</div>
		)
	}
}
export default withRouter(Main)