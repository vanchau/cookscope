import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../css/RecipeList.css'
import { Card, CardColumns } from 'react-bootstrap';
//import dummyData from '../assets/dummy/recipes.json'

class RecipeList extends Component {
	
	state = {recipes: []}

	routeChange = (id) => {
		console.log(id)
    let path = '/recipe/' + id;
    this.props.history.push(path);
	}

	componentDidMount() {
		const baseUrl = '/api/recipes'
    axios.get(baseUrl)
      .then(res => {
        const recipes = res.data;
        this.setState({ recipes });
      })
  }
	
	render() {
		return (
			<CardColumns>
			{this.state.recipes.map(recipe => (
			<Card
				onClick={() => this.routeChange(recipe.id)}
				key={recipe.id}
			>
				<Card.Body>
					<Card.Img 
					src={(recipe.imageUrl)} />
					<Card.Title>{recipe.title}</Card.Title>
					<Card.Text>
						by <a className="card-author" href="#action" >{recipe.author}</a>
					</Card.Text>
				</Card.Body>
			</Card>
			))}
		</CardColumns>
		)
	}
}
export default withRouter(RecipeList)