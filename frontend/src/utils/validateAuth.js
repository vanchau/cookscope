export default function validateAuth(values, isSigningUp) {
  let errors = {}
  // Username Errors, applied only when signing up
  if (isSigningUp && !values.username) {
    errors.username = 'Please provide a username'
  } else if (isSigningUp && !/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(values.username)) {
    errors.username = 'Invalid username'
  }
  // Email Errors
  if (!values.email) {
    errors.email = 'Please insert email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // Password Errors
  if (!values.password) {
    errors.password = 'Please insert password'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long'
  }
  return errors
}
