import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import '../css/CreateRecipe.css'

const CreateRecipe = () => {

  const [numberOfIngredients, updateIngredientNum] 	= useState(1)
  const [ingredients, addIngredientObj] 			= useState([{ name: '', id: 1 }])
  const [numberOfSteps, addStepCount] 				= useState(1)
  const [steps, addInstruction] 							= useState([{ instruction: '', id: 1 }])

  const addIngredient = () => {
    updateIngredientNum(numberOfIngredients + 1)
    addIngredientObj([ ...ingredients, { name: '', id: numberOfIngredients + 1 } ])
  }

  const addStep = () => {
    addStepCount(numberOfSteps + 1)
    addInstruction([ ...steps, { instruction: '', id: numberOfSteps + 1 } ])
  }

  return (
    <Form style={{ padding: '20px 120px' }} >
      <Form.Group controlId='formGridAddress1'>
        <Form.Control style={{ height: '80px', fontSize: '2rem' }} type='text' placeholder='Enter recipe title' />
      </Form.Group>

      <Form.Group controlId='formGridAddress1'>
        <Form.Control as='textarea' rows='1' placeholder='Tell a story about your recipe' />
      </Form.Group>

      <h5 className='recipe-subtitles' >Ingredients</h5>
      <hr style={{ marginTop: '0' }} />

      {ingredients.map(ingredient => (
        <Form.Group key={ingredient.id} controlId={ingredient.id} className='ingredients'>
          <Form.Control placeholder='2 cloves of garlic' />
        </Form.Group>
      ))}

      <Button className='add-ingredient' onClick={addIngredient} >+</Button>

      <h5 className='recipe-subtitles' >Instructions</h5>
      <hr style={{ marginTop: '0' }} />

      {steps.map((step, index) => (
        <Form.Group key={step.id} controlId={step.id} className='steps'>
          <Form.Label>Step {index + 1}</Form.Label>
          <Form.Control placeholder='Write instructions here' />
        </Form.Group>
      ))}

      <Button className='add-ingredient' onClick={addStep} >+</Button>
      <hr />

      <Button variant='primary' type='submit' className='submit-button' >
				I`m done!
      </Button>
    </Form>
  )
}

export default CreateRecipe