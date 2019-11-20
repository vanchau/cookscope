import React, { useEffect, useState, useRef } from 'react'
import { Nav, NavDropdown, Navbar, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { IoMdSettings } from 'react-icons/io'

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

const NavigationBar = (props) => {
  const input = useRef(null)
  let history = useHistory()
  let currentSearch = ''
  if (history.location.pathname.includes("/search=")) {
    currentSearch = history.location.pathname.split("=")[1].split("+").join(" ")
  }
  const [currentSearchWords, setCurrentSearchWords] = useState(currentSearch)

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

  const handleSearchChange = (event) => {
    setCurrentSearchWords(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const splitSearchWords = currentSearchWords.toLowerCase().split(" ").join("+")
    history.push(`/search=${splitSearchWords}`)
  }

  const clearSearch = () => {
    setCurrentSearchWords('')

  }

  return (
    <Navbar className='navigation-bar d-flex justify-content-between sticky-top'>
      <div>
        <Link className='navbar-brand' to='/' ref={input} onClick={clearSearch}>
          <img className='logo-image' src={logo} alt='logo'/>
        </Link>
      </div>
      <div>
        <Form className="search-form" onSubmit={handleSearchSubmit}>
          <Form.Control value={currentSearchWords} onChange={handleSearchChange} type='text' placeholder='Enter dish or ingredient(s)' className='search-bar form-size main-search'/>
          <Button variant='navbar-button' className='search-button' type='submit' >Search</Button>
        </Form>
      </div>
      <div>
        <Nav className='button-profile-settings'>
          {
            isLoggedIn ?
              <LinkContainer to='/create-recipe' disabled={!isLoggedIn}>
                <Button variant='outline-create-recipe-button'>
                  Create recipe
                </Button>
              </LinkContainer>
              :
              <OverlayTrigger
                key={'create-recipe-overlay'}
                placement={'bottom'}
                overlay={<Tooltip id={'tooltip-bottom'}>You must log in to create a recipe.</Tooltip>}
              >
                <span className='d-inline-block'>
                  <LinkContainer to='/create-recipe' disabled={!isLoggedIn}>
                    <Button variant='outline-create-recipe-button'>
                      Create recipe
                    </Button>
                  </LinkContainer>
                </span>
              </OverlayTrigger>
          }

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

          {
            isLoggedIn &&
          <Link className='navbar-brand' to={`/user/${localStorage.getItem('username')}`}>
            <FiUser className='profile-icon'/>
          </Link>
          }

          <NavDropdown className='settings-dropdown' title={<IoMdSettings className='dropdown-icon' />} >
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