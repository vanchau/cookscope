import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import '../css/LoginWindow.css'

const LoginWindow = (props) => {

  // eslint-disable-next-line react/prop-types
  const { show, handleChange, handleSubmit, handleClose, goToSignUp, errors } = props

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='Enter email' onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' placeholder='Enter password' onChange={handleChange} autoComplete='on' />
          </Form.Group>
          {Object.keys(errors).length !== 0 && <p className='error-text'>{errors[Object.keys(errors)[0]]}</p>}
        </Form>
        <div className='submit-area'>
          <Button className='submit-btn' onClick={handleSubmit}>
					Log in
          </Button>
          <p className='no-account-info' >
						Don&apos;t have an account?
            <button className='signup-btn' onClick={goToSignUp}>Sign up</button>
          </p>
        </div>
      </Modal.Body>
    </Modal>)
}

export default LoginWindow