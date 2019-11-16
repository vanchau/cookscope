import React, { useEffect } from 'react'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import '../css/NavigationBar.css'
import logo from '../assets/logo2.png'
import useFormValidation from '../utils/useFormValidation'
import validateAuth from '../utils/validateAuth'
import SignUpWindow from './SignUpWindow'
import LoginWindow from './LoginWindow'

const INITIAL_STATE = {
  username: '',
  email: '',
  password: ''
}

const NavigationBar = () => {

  const {
    handleSubmit,
    handleChange,
    handleClose,
    handleLogOut,
    isLoggedIn,
    setToLoggedIn,
    setToSigningUp,
    showSignUpWindow,
    showLoginWindow,
    showSignUp,
    showLogin,
    errors
  } = useFormValidation(INITIAL_STATE, validateAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToLoggedIn(true)
    } else {
      localStorage.removeItem('token')
      setToLoggedIn(false)
    }
  }, [setToLoggedIn])

  const goToLogin = () => {
    setToSigningUp(false)
    showSignUpWindow(false)
    showLoginWindow(true)
    handleClose()
  }

  const goToSignUp = () => {
    setToSigningUp(true)
    showLoginWindow(false)
    showSignUpWindow(true)
    handleClose()
  }

  const closeWindow = () => {
    showSignUpWindow(false)
    showLoginWindow(false)
    handleClose()
  }

  return (
    <Navbar
      className='navigation-bar d-flex justify-content-between sticky-top'
    >
      <div>
        <Link className='navbar-brand' to='/'>
          <img className='logo-image' src={logo} alt='logo' />
        </Link>
      </div>

      <div>
        <Form inline className='mx-auto'>
          <FormControl type='text' placeholder='Enter dish or ingredient(s)' className='search-bar form-size' />
          {/* <Button variant="search-button" type="submit">Search</Button> */}
        </Form>
      </div>

      <div>
        <Nav>
          <LinkContainer to='/create-recipe'>
            <Button variant='outline-create-recipe-button' >
							Create recipe
            </Button>
          </LinkContainer>

          <SignUpWindow
            show={showSignUp}
            handleChange={handleChange}
            goToLogin={goToLogin}
            errors={errors}
            handleSubmit={handleSubmit}
            handleClose={closeWindow}
          />

          <LoginWindow
            show={showLogin}
            handleChange={handleChange}
            goToSignUp={goToSignUp}
            errors={errors}
            handleSubmit={handleSubmit}
            handleClose={closeWindow}
          />

          <NavDropdown title='Settings' id='basic-nav-dropdown' style={{ marginRight: '20px', marginLeft: '20px' }} >
            {isLoggedIn &&
            <LinkContainer to={`/user/${localStorage.getItem('username')}`}>
              <NavDropdown.Item>My profile</NavDropdown.Item>
            </LinkContainer>}
            <LinkContainer to='/terms'>
              <NavDropdown.Item>Terms of Service</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/privacy'>
              <NavDropdown.Item>Privacy Policy</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            {isLoggedIn
              ?
              <LinkContainer to='/' exact>
                <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
              </LinkContainer>
              :
              <NavDropdown.Item onClick={goToLogin} >Log in</NavDropdown.Item>
            }

          </NavDropdown>
        </Nav>
      </div>
    </Navbar>
  )
}

export default NavigationBar