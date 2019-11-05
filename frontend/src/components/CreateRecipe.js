import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

import '../css/CreateRecipe.css'
//import trash_can from '../assets/trash_can.png'

const CreateRecipe = () => {

  const [ingredients, addIngredient]	= useState([{ name: '', id: 1 }])
  const [numberOfSteps, addStepCount]	= useState(1)
  const [steps, addInstruction] 			= useState([{ instruction: '', id: 1 }])

  const addNewIngredient = () => {
    const newID = ingredients.length === 0 ? 1 : ingredients[ingredients.length - 1].id + 1
    addIngredient([ ...ingredients, { name: '', id: newID } ])
  }

  const addStep = () => {
    addStepCount(numberOfSteps + 1)
    addInstruction([ ...steps, { instruction: '', id: numberOfSteps + 1 } ])
  }

  const removeIngredient = (id) => {
    const newList = ingredients.filter(obj => obj.id !== id)
    addIngredient(newList)
  }

  return (
    <React.Fragment>
      <div style={{height:'1em', background:'transparent'}}></div>
      <Card className='recipe-card'>
        <Card.Body>

          <Form.Group controlId='formGridAddress1'>
            <Form.Control
              style={{ height: '80px', fontSize: '2rem', fontWeight: 'bold' }}
              type='text'
              placeholder='Enter recipe title'
            />
          </Form.Group>

          <Form.Group controlId='formGridAddress1'>
            <Form.Control as='textarea' rows='2' placeholder='Tell us about your recipe' />
          </Form.Group>

          <h5 className='recipe-subtitles' >Ingredients</h5>
          <hr style={{ marginTop: '0' }} />

          {ingredients.map(ingredient => (
            <Form.Group key={ingredient.id} controlId={ingredient.id} className='ingredients' style={{ display: 'flex' }}>
              <Form.Control placeholder='2 cloves of garlic' style={{ flex: '10'}}/>
              <Button onClick={() => removeIngredient(ingredient.id)}>Remove</Button>
              {/* <i style={{ flex: '1', marginLeft: '5px', maxHeight: '38px' }} src={trash_can} alt='logo' /> */}
            </Form.Group>
          ))}

          <Button className='add-ingredient-button' onClick={addNewIngredient} >add ingredient</Button>

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

        </Card.Body>
      </Card>
    </React.Fragment>

  /*  <Form style={{ padding: '20px 120px' }} >
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

      <Button className='add-ingredient' onClick={addNewIngredient} >+</Button>

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
  ) */
  )
}

export default CreateRecipe