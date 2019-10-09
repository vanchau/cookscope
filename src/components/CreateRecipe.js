import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const CreateRecipe = () => (
    <Form>
        <Form.Group controlId="formGridAddress1">
            <Form.Control size="lg" type="text" placeholder="Enter recipe title" />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Story of the recipe</Form.Label>
            <Form.Control placeholder="Tell us your story" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
            <Form.Label>Insert ingredients</Form.Label>
            <Form.Control placeholder="e.g. 2 cloves of garlic" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
            <Form.Label>Directions</Form.Label>
            <Form.Control placeholder="step 1" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled>
            I'm done!
        </Button>
    </Form>
)