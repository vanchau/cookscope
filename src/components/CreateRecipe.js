import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/CreateRecipe.css'

class CreateRecipe extends Component {

	constructor(props) {
    super(props);
    this.state = {
			ingredients: [{ name: '', id: 1 }],
			numberOfIngredients: 1,
			steps: [{ instruction: '', id: 1 }],
			numberOfSteps: 1
		};
	}

	addIngredient = () => {
		const numOfIngredients = this.state.numberOfIngredients + 1
		this.setState(prevState => ({
			ingredients: [...prevState.ingredients, { name: '', id: numOfIngredients }],
			numberOfIngredients: numOfIngredients
		}))
	}

	addStep = () => {
		const numOfSteps = this.state.numberOfSteps + 1
		this.setState(prevState => ({
			steps: [...prevState.steps, { instruction: '', id: numOfSteps }],
			numberOfSteps: numOfSteps
		}))
	}

	render() {
		return (
			<Form style={{ padding: '20px 120px' }} >
				<Form.Group controlId="formGridAddress1">
					<Form.Control style={{ height: '80px', fontSize: '2rem' }} type="text" placeholder="Enter recipe title" />
				</Form.Group>

				<Form.Group controlId="formGridAddress1">
					<Form.Control as="textarea" rows="1" placeholder="Tell a story about your recipe" />
				</Form.Group>

				<h5 className="recipe-subtitles" >Ingredients</h5>
				<hr style={{ marginTop: '0' }} />

				{this.state.ingredients.map(ingredient => (
					<Form.Group key={ingredient.id} controlId={ingredient.id} className="ingredients">
						<Form.Control placeholder="2 cloves of garlic" />
					</Form.Group>
				))}

				<Button className="add-ingredient" onClick={this.addIngredient} >+</Button>

				<h5 className="recipe-subtitles" >Directions</h5>
				<hr style={{ marginTop: '0' }} />

				{this.state.steps.map((step, index) => (
					<Form.Group key={step.id} controlId={step.id} className="steps">
						<Form.Label>step {index + 1}</Form.Label>
						<Form.Control placeholder="Write instructions here" />
					</Form.Group>
				))}

				<Button className="add-ingredient" onClick={this.addStep} >+</Button>
				<hr />

				<Button variant="primary" type="submit" className="submit-button" >
					I'm done!
				</Button>
			</Form>
		)
	}
}

export default CreateRecipe