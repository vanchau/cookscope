import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import '../css/SignUpWindow.css'

const SignUpWindow = (props) => {

  // eslint-disable-next-line react/prop-types
  const { show, handleChange, handleSubmit, handleClose, goToLogin, errors } = props

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
          <div key={'default-checkbox'} className='mb-3'>
            <Form.Check
              type={'checkbox'}
              id={'default-checkbox'}
              style={{ fontSize: '13px' }}
              label={
                <label>I have read and understood the
                  <a href='/terms'>Terms of Service</a> and the <a href='/privacy'>Privacy Policy</a>
                </label>
              }
            />
          </div>
          {Object.keys(errors).length !== 0 && <p className='error-text'>{errors[Object.keys(errors)[0]]}</p>}
        </Form>
        <div className='submit-area'>
          <Button className='submit-btn' onClick={handleSubmit}>
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