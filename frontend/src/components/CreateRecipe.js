import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

import '../css/CreateRecipe.css'
//import trash_can from '../assets/trash_can.png'

const CreateRecipe = () => {

  const [ingredients, addIngredient]	= useState([{ name: '', id: 1 }])
  const [steps, addStep] = useState([{ instruction: '', id: 1 }])
  const [difficulty, switchDifficulty] = useState('beginner')
  const [imageFile, setImageFile] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  const handleImageChange = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
      setImageFile(file)
    }

    reader.readAsDataURL(file)
  }

  const addNewIngredient = () => {
    const newID = ingredients.length === 0 ? 1 : ingredients[ingredients.length - 1].id + 1
    addIngredient([ ...ingredients, { name: '', id: newID } ])
  }

  const addNewStep = () => {
    const newID = steps.length === 0 ? 1 : steps[steps.length - 1].id + 1
    addStep([ ...steps, { instruction: '', id: newID } ])
  }

  const removeStep = (id) => {
    const updatedList = steps.filter(obj => obj.id !== id)
    addStep(updatedList)
  }

  const removeIngredient = (id) => {
    const updatedList = ingredients.filter(obj => obj.id !== id)
    addIngredient(updatedList)
  }

  return (
    <React.Fragment>
      <div style={{ height: '1em', background:'transparent' }}></div>
      <Card className='recipe-card'>
        <Card.Body>
          <Form onSubmit={() => console.log('submitted')}>

            <Form.Group controlId='recipeTitle'>
              <Form.Control
                style={{ height: '80px', fontSize: '2rem', fontWeight: 'bold' }}
                type='text'
                placeholder='Enter recipe title'
              />
            </Form.Group>

            <Form.Group className='fields' controlId='recipeStory'>
              <Form.Control as='textarea' rows='2' placeholder='Tell us about your recipe' />
            </Form.Group>

            <div>
              <label htmlFor='file-upload' className='custom-file-upload'>
                Upload photo
              </label>
              <input id='file-upload' type='file' accept={'image/jpg, image/png'} onChange={handleImageChange}/>
            </div>

            {imagePreviewUrl ? <img style={{ marginTop: '20px', width: '80%' }} src={imagePreviewUrl} /> : <React.Fragment></React.Fragment>}

            <h5 className='recipe-subtitles' >Basic Information</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Time to cook (in minutes): </Form.Label>
              <br></br>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Form.Control type='number' placeholder='0' style={{ flex: 1, marginRight: '10px' }}/>
                <Form.Label style={{ flex: 2, marginTop: '0.5rem' }}> minutes</Form.Label>
                <div style={{ flex: 8 }}></div>
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Portion: </Form.Label>
              <br></br>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Form.Control type='number' placeholder='1' style={{ flex: 1, marginRight: '10px' }}/>
                <Form.Label style={{ flex: 2, marginTop: '0.5rem' }}> serving(s)</Form.Label>
                <div style={{ flex: 8 }}></div>
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Select difficulty: </Form.Label>
              <br></br>
              <div key={`inline-radio`}>
                <Form.Check
                  inline
                  label='Beginner'
                  value={'beginner'}
                  type={'radio'}
                  id={`inline-radio-1`}
                  checked={difficulty === 'beginner'}
                  onChange={e => switchDifficulty(e.target.value)}
                />
                <Form.Check
                  inline
                  label='Amateur'
                  value={'amateur'}
                  type={'radio'}
                  id={`inline-radio-2`}
                  checked={difficulty === 'amateur'}
                  onChange={e => switchDifficulty(e.target.value)}
                />
                <Form.Check
                  inline
                  label='Master Chef'
                  value={'chef'}
                  type={'radio'}
                  id={`inline-radio-3`}
                  checked={difficulty === 'chef'}
                  onChange={e => switchDifficulty(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Select categories: </Form.Label>
              <br></br>
              <div key={`inline-checkbox`}>
                <Form.Check inline label='Beef' type={'checkbox'} id={`inline-checkbox-1`} />
                <Form.Check inline label='Bread' type={'checkbox'} id={`inline-checkbox-2`} />
                <Form.Check inline label='Breakfast' type={'checkbox'} id={`inline-checkbox-3`} />
                <Form.Check inline label='Budget friendly' type={'checkbox'} id={`inline-checkbox-4`} />
                <Form.Check inline label='Casseroles' type={'checkbox'} id={`inline-checkbox-5`} />
                <Form.Check inline label='Chicken' type={'checkbox'} id={`inline-checkbox-6`} />
                <Form.Check inline label='Dessert' type={'checkbox'} id={`inline-checkbox-7`} />
                <Form.Check inline label='Dinner' type={'checkbox'} id={`inline-checkbox-8`} />
                <Form.Check inline label='Fish' type={'checkbox'} id={`inline-checkbox-9`} />
                <Form.Check inline label='Healthy' type={'checkbox'} id={`inline-checkbox-10`} />
                <Form.Check inline label='High cuisine' type={'checkbox'} id={`inline-checkbox-11`} />
                <Form.Check inline label='Pasta' type={'checkbox'} id={`inline-checkbox-12`} />
                <Form.Check inline label='Pork' type={'checkbox'} id={`inline-checkbox-13`} />
                <Form.Check inline label='Salad' type={'checkbox'} id={`inline-checkbox-14`} />
                <Form.Check inline label='Slow cooker' type={'checkbox'} id={`inline-checkbox-15`} />
                <Form.Check inline label='Snacks' type={'checkbox'} id={`inline-checkbox-16`} />
                <Form.Check inline label='Soup' type={'checkbox'} id={`inline-checkbox-17`} />
                <Form.Check inline label='Vegan' type={'checkbox'} id={`inline-checkbox-18`} />
                <Form.Check inline label='Vegetarian' type={'checkbox'} id={`inline-checkbox-19`} />
              </div>
            </Form.Group>

            <h5 className='recipe-subtitles' >Ingredients</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              {ingredients.map(ingredient => (
                <div key={ingredient.id} style={{ display: 'flex', marginBottom: '20px' }}>
                  <Form.Control placeholder='e.g. 2 cloves of garlic' style={{ flex: '10'}}/>
                  <Button className='remove-button' onClick={() => removeIngredient(ingredient.id)}>Remove</Button>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' onClick={addNewIngredient} >add ingredient</Button>

            <h5 className='recipe-subtitles' >Steps</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              {steps.map((step, index) => (
                <div key={step.id} style={{ marginBottom: '20px' }}>
                  <Form.Label>Step {index + 1}</Form.Label>
                  <div style={{ display: 'flex' }}>
                    <Form.Control placeholder='Write instructions here' style={{ flex: '10'}}/>
                    <Button className='remove-button' onClick={() => removeStep(step.id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' onClick={addNewStep} >add step</Button>

            <Button variant='primary' type='submit' className='submit-button' >Done!</Button>

          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default CreateRecipe