import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/CreateRecipe.css'

export const CreateRecipe = () => (
	<Form style={{ padding: '20px 120px' }} >
		<Form.Group controlId="formGridAddress1">
			<Form.Control style={{ height: '80px', fontSize: '2rem' }} type="text" placeholder="Enter recipe title" />
		</Form.Group>

		<Form.Group controlId="formGridAddress1">
			<Form.Control as="textarea" rows="1" placeholder="Tell a story about your recipe" />
		</Form.Group>

		<h5>Ingredients</h5>
		<hr style={{ marginTop: '0'}} />

		<Form.Group controlId="formGridAddress2" className="ingredients" >
			<Form.Control placeholder="2 cloves of garlic" />
		</Form.Group>

		<Button className="add-ingredient" >+</Button>

		<h5>Directions</h5>
		<hr style={{ marginTop: '0'}} />

		<Form.Group controlId="formGridAddress2">
			<Form.Label>step 1</Form.Label>
			<Form.Control as="textarea" rows="2" placeholder="Write instruction here" />
		</Form.Group>

		<Button className="add-ingredient" >+</Button>
		<hr />

		<Button variant="primary" type="submit" className="submit-button" >
			I'm done!
		</Button>
	</Form>
)