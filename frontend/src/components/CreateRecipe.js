import React, { useState } from 'react'
import { Form, Button, Card, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Prompt } from 'react-router'

import '../css/CreateRecipe.css'
import useFormValidation from '../utils/useRecipeFormValidation'
import validateRecipeForm from '../utils/validateRecipeForm'
import categories from '../assets/categories.json'

const INITIAL_STATE = {
  title: '',
  description: '',
  imageFile: {},
  difficulty: 'Easy',
  hours: 0,
  minutes: 0,
  servings: 0,
  categories: [],
  ingredients: [{ amount: '', ingredient: '', id: 1 }],
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
      setImageFile(reader.result.split(',')[1]) // base64
      //setImageFile(file)

    }

    reader.readAsDataURL(file)
  }

  const diets = ['Vegetarian', 'Vegan', 'Dairy-free', 'Gluten-free']

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
                accept={'image/*'}
                onChange={handleImageChange}
              />
            </div>

            {imagePreviewUrl && <img style={{ marginTop: '20px', width: '80%' }} alt='loading' src={imagePreviewUrl} />}

            <h5 className='recipe-subtitles' >Basic Information</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Time to cook: </Form.Label>
              <br></br>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Form.Control
                  className='no-spinner'
                  type='number'
                  name='hours'
                  onChange={handleChange}
                  placeholder={INITIAL_STATE.hours}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <Form.Label style={{ flex: 2, marginTop: '0.5rem' }}> hours</Form.Label>
                <Form.Control
                  className='no-spinner'
                  type='number'
                  name='minutes'
                  onChange={handleChange}
                  placeholder={INITIAL_STATE.minutes}
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
                  className='no-spinner'
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
                  label='Easy'
                  name='difficulty'
                  value={'Easy'}
                  type={'radio'}
                  id={'inline-radio-1'}
                  checked={values.difficulty === 'Easy'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Medium'
                  name='difficulty'
                  value={'Medium'}
                  type={'radio'}
                  id={'inline-radio-2'}
                  checked={values.difficulty === 'Medium'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Challenging'
                  name='difficulty'
                  value={'Challenging'}
                  type={'radio'}
                  id={'inline-radio-3'}
                  checked={values.difficulty === 'Challenging'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className='fields'>
              <Form.Label style={{ fontWeight: 'bold' }}>Select categories: </Form.Label>
              <br></br>
              <div key={'inline-checkbox'}>
                {categories.categories.concat(diets).map((category, i) => (
                  <Form.Check
                    inline name='categories'
                    onChange={handleChange}
                    value={category}
                    label={category}
                    type={'checkbox'}
                    key={`inline-checkbox-${i}`}
                  />
                ))}
              </div>
            </Form.Group>

            <h5 className='recipe-subtitles' >Ingredients</h5>
            <hr style={{ marginTop: '0' }} />

            <Form.Group className='fields'>
              {values.ingredients.map(ingredient => (
                <div key={ingredient.id} style={{ display: 'flex', marginBottom: '20px' }}>
                  <Form.Control
                    id={ingredient.id}
                    placeholder='e.g. 3 dl'
                    onChange={handleChange}
                    name='ingredientAmounts'
                    style={{ flex: '2', marginRight: '10px'}}
                  />
                  <Form.Control
                    id={ingredient.id}
                    placeholder='e.g. water'
                    onChange={handleChange}
                    name='ingredients'
                    style={{ flex: '10'}}
                  />
                  <Button className='remove-button' variant='none' onClick={() => removeIngredient(ingredient.id)}>Remove</Button>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' variant='none' onClick={addIngredient} >add ingredient</Button>

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
                    <Button className='remove-button' variant='none' onClick={() => removeInstruction(instruction.id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </Form.Group>

            <Button className='add-button' variant='none' onClick={addInstruction} >add step</Button>

            <Button variant='' type='submit' className='submit-button' >Done!</Button>
            {Object.keys(errors).length !== 0 && <p className='error-text'>{errors[Object.keys(errors)[0]]}</p>}
          </Form>
        </Card.Body>
      </Card>

      <Modal show={completed}>
        <Modal.Header>
          <Modal.Title>All set!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your recipe has been successfully created.
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to='/'>
            <Button variant='' onClick={handleClose}>
              Go to home page
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>

      <Prompt
        when={!completed}
        message={'Are you sure you want to leave this page without saving?'}
      />
    </React.Fragment>
  )
}

export default CreateRecipe