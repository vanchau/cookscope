import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/RecipeList.css'
//import dummyData from '../assets/dummy/recipes.json'

class RecipeList extends Component {
	
	state = {recipes: []}

	routeChange = (id) => {
		console.log(id)
    let path = '/recipe/' + id;
    this.props.history.push(path);
	}

	componentDidMount() {
    axios.get('http://localhost:3001/api/recipes/')
      .then(res => {
        const recipes = res.data;
        this.setState({ recipes });
      })
  }
	
	render() {
		return (
			<div style={{ flex: '5' }} >
			{this.state.recipes.map(recipe => (
			<Card
				onClick={() => this.routeChange(recipe.id)}
				key={recipe.id}
				style={{ left:'18rem', width: '35rem', height: '18rem', alignItems: 'center', margin: '30px 40px 30px 40px' }}
			>
				<Card.Img 
					style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
					variant="top"
					src={(recipe.imageUrl)} />
				<Card.ImgOverlay>
					<div>
						<Card.Title style={{ color: '#3C3C3C' }}>{recipe.title}</Card.Title>
						<Card.Text style={{ color: '#3C3C3C' }}>
							by <a className="card-author" href="#action" >{recipe.author}</a>
						</Card.Text>
					</div>
					{/*<Button variant="recipe-button" style={{ marginLeft: '75%', marginTop: '140px' }} >View recipe</Button>*/}
					</Card.ImgOverlay>
			</Card>
			))}
		</div>
		)
	}
}
export default withRouter(RecipeList)