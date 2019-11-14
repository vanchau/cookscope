import { useState, useEffect } from 'react'

import { signup, login, logout } from '../components/api'

function useFormValidation(initialState, validate) {
  const [isSigningUp, setToSigningUp] = useState(false)
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [isLoggedIn, setToLoggedIn] = useState(false)
  const [showSignUp, showSignUpWindow] = useState(false)
  const [showLogin, showLoginWindow] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors && isSigningUp) {
        signup(values)
          .then(token => {
            localStorage.setItem('token', token)
            setToLoggedIn(true)
            showSignUpWindow(false)
          })
          .catch(() => setErrors({ response: 'Something went wrong...' }))
      } else if (noErrors && !isSigningUp) {
        login(values)
          .then(token => {
            localStorage.setItem('token', token)
            setToLoggedIn(true)
            showLoginWindow(false)
          })
          .catch(() => setErrors({ response: 'Wrong email address or password' }))
      }
      setSubmitting(false)
    } else {
      setSubmitting(false)
    }
  }, [errors, isSubmitting, values, isSigningUp])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleLogOut = () => {
    const token = localStorage.getItem('token')
    logout(token)
      .then(() => {
        localStorage.removeItem('token')
        setToLoggedIn(false)
      })
      .catch(error =>alert(error))
  }

  // reset fields to initial values
  const handleClose = () => {
    setErrors({})
    setSubmitting(false)
    setValues(initialState)
  }

  /*
  const handleBlur = () => {
    const validationErrors = validate(values, isSigningUp)
    setErrors(validationErrors)
	}
	*/

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(values, isSigningUp)
    setErrors(validationErrors)
    setSubmitting(true)
  }

  return {
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
  }
}

export default useFormValidation
