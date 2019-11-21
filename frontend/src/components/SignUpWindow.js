import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import '../css/SignUpWindow.css'

const SignUpWindow = (props) => {

  // eslint-disable-next-line react/prop-types
  const { show, handleChange, setImageFile, handleSubmit, handleClose, goToLogin, errors } = props
  const [termsUnderstood, setToTermsUnderstood] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  const check = () => {
    setToTermsUnderstood(!termsUnderstood)
  }

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



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' name='username' placeholder='Enter username' onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='Enter email' onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' placeholder='Enter password' onChange={handleChange} autoComplete='on' />
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
          {imagePreviewUrl && <img style={{ marginTop: '20px', width: '100%' }} alt='loading' src={imagePreviewUrl} />}
          <div key={'default-checkbox'} className='mb-3'>
            <Form.Check
              type={'checkbox'}
              id={'default-checkbox'}
              onChange={check}
              style={{ fontSize: '13px' }}
              label={
                <label>I have read and understood the&nbsp;
                  <a href='/terms'>Terms of Service</a> and the <a href='/privacy'>Privacy Policy</a>
                </label>
              }
            />
          </div>
          
          {Object.keys(errors).length !== 0 && <p className='error-text'>{errors[Object.keys(errors)[0]]}</p>}
        </Form>
        <div className='submit-area'>
          <Button className='submit-btn' onClick={handleSubmit} disabled={!termsUnderstood}>
						Sign up
          </Button>
          <p className='no-account-info' >
						Already have an account?
            <button className='login-btn' onClick={goToLogin}>Log in</button>
          </p>
        </div>
      </Modal.Body>
    </Modal>)
}

export default SignUpWindow