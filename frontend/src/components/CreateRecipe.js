import React, { useState } from 'react'
import { Form, Button, Card, Modal } from 'react-bootstrap'

import '../css/CreateRecipe.css'
import useFormValidation from '../utils/useRecipeFormValidation'
import validateRecipeForm from '../utils/validateRecipeForm'

// The structure of the recipe data set
const INITIAL_STATE = {
  title: '',
  description: '',
  imageFile: {},
  difficulty: 'Beginner',
  timeToCook: 0,
  servings: 0,
  categories: [],
  ingredients: [{ ingredient: '', id: 1 }],
  instructions: [{ instruction: '', id: 1 }]
}

const CreateRecipe = () => {
  const {
    handleChange,
    handleSubmit,
    handleClose,
    setImageFile,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    errors,
    completed,
    values
  } = useFormValidation(INITIAL_STATE, validateRecipeForm)

  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  const handleImageChange = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
      setImageFile(file)
    }

    reader.readAsDataURL(file)
  }

  return (
    <React.Fragment>
      <div style={{ height: '1em', background:'transparent' }}></div>
      <Card className='recipe-card'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId='recipeTitle'>
              <Form.Control
                className='recipe-title'
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Enter recipe title'
              />
            </Form.Group>

            <Form.Group className='fields' controlId='recipeStory'>
              <Form.Control
                as='textarea'
                rows='2'
                onChange={handleChange}
                name='description'
                placeholder='Tell us about your recipe'
              />
            </Form.Group>

            <div>
              <label htmlFor='file-upload' className='custom-file-upload'>
                Upload photo
              </label>
              <input
                id='file-upload'
                name='imageUrl'
                type='file'
                accept={'image/jpg, image/png'}
                onChange={handleImageChange}
              />
            </div>

            {imagePreviewUrl && <img style={{ marginTop: '20px', width: '80%' }} alt='loading' src={imagePreviewUrl} />}

            <h5 className='recipe-subtitles' >Basic Information</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Time to cook (in minutes): </Form.Label>
              <br></br>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Form.Control
                  type='number'
                  name='timeToCook'
                  onChange={handleChange}
                  placeholder={INITIAL_STATE.timeToCook}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <Form.Label style={{ flex: 2, marginTop: '0.5rem' }}> minutes</Form.Label>
                <div style={{ flex: 8 }}></div>
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Portion: </Form.Label>
              <br></br>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Form.Control
                  type='number'
                  name='servings'
                  placeholder={INITIAL_STATE.servings}
                  onChange={handleChange}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <Form.Label style={{ flex: 2, marginTop: '0.5rem' }}> serving(s)</Form.Label>
                <div style={{ flex: 8 }}></div>
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Select difficulty: </Form.Label>
              <br></br>
              <div key={'inline-radio'}>
                <Form.Check
                  inline
                  label='Beginner'
                  name='difficulty'
                  value={'Beginner'}
                  type={'radio'}
                  id={'inline-radio-1'}
                  checked={values.difficulty === 'Beginner'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Amateur'
                  name='difficulty'
                  value={'Amateur'}
                  type={'radio'}
                  id={'inline-radio-2'}
                  checked={values.difficulty === 'Amateur'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Master Chef'
                  name='difficulty'
                  value={'Master Chef'}
                  type={'radio'}
                  id={'inline-radio-3'}
                  checked={values.difficulty === 'Master Chef'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Select categories: </Form.Label>
              <br></br>
              <div key={'inline-checkbox'}>
                <Form.Check inline name='categories' onChange={handleChange} value='Beef' label='Beef' type={'checkbox'} id={'inline-checkbox-1'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Bread' label='Bread' type={'checkbox'} id={'inline-checkbox-2'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Breakfast' label='Breakfast' type={'checkbox'} id={'inline-checkbox-3'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Budget friendly' label='Budget friendly' type={'checkbox'} id={'inline-checkbox-4'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Casseroles' label='Casseroles' type={'checkbox'} id={'inline-checkbox-5'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Chicken' label='Chicken' type={'checkbox'} id={'inline-checkbox-6'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Dessert' label='Dessert' type={'checkbox'} id={'inline-checkbox-7'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Dinner' label='Dinner' type={'checkbox'} id={'inline-checkbox-8'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Fish' label='Fish' type={'checkbox'} id={'inline-checkbox-9'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Healthy' label='Healthy' type={'checkbox'} id={'inline-checkbox-10'} />
                <Form.Check inline name='categories' onChange={handleChange} value='High cuisine' label='High cuisine' type={'checkbox'} id={'inline-checkbox-11'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Pasta' label='Pasta' type={'checkbox'} id={'inline-checkbox-12'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Pork' label='Pork' type={'checkbox'} id={'inline-checkbox-13'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Salad' label='Salad' type={'checkbox'} id={'inline-checkbox-14'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Slow cooker' label='Slow cooker' type={'checkbox'} id={'inline-checkbox-15'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Snacks' label='Snacks' type={'checkbox'} id={'inline-checkbox-16'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Soup' label='Soup' type={'checkbox'} id={'inline-checkbox-17'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Vegan' label='Vegan' type={'checkbox'} id={'inline-checkbox-18'} />
                <Form.Check inline name='categories' onChange={handleChange} value='Vegetarian' label='Vegetarian' type={'checkbox'} id={'inline-checkbox-19'} />
              </div>
            </Form.Group>

            <h5 className='recipe-subtitles' >Ingredients</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              {values.ingredients.map(ingredient => (
                <div key={ingredient.id} style={{ display: 'flex', marginBottom: '20px' }}>
                  <Form.Control
                    id={ingredient.id}
                    placeholder='e.g. 2 cloves of garlic'
                    onChange={handleChange}
                    name='ingredients'
                    style={{ flex: '10'}}
                  />
                  <Button className='remove-button' onClick={() => removeIngredient(ingredient.id)}>Remove</Button>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' onClick={addIngredient} >add ingredient</Button>

            <h5 className='recipe-subtitles' >Steps</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              {values.instructions.map((instruction, index) => (
                <div key={instruction.id} style={{ marginBottom: '20px' }}>
                  <Form.Label>Step {index + 1}</Form.Label>
                  <div style={{ display: 'flex' }}>
                    <Form.Control
                      id={instruction.id}
                      placeholder='Write instructions here'
                      name='instructions'
                      onChange={handleChange}
                      style={{ flex: '10'}}
                    />
                    <Button className='remove-button' onClick={() => removeInstruction(instruction.id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' onClick={addInstruction} >add step</Button>

            <Button variant='primary' type='submit' className='submit-button' >Done!</Button>
            {Object.keys(errors).length !== 0 && <p className='error-text'>{errors[Object.keys(errors)[0]]}</p>}
          </Form>
        </Card.Body>
      </Card>

      <Modal show={completed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>All set!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your recipe has been successfully published.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
						Ok
          </Button>
        </Modal.Footer>
      </Modal>

    </React.Fragment>
  )
}

export default CreateRecipe