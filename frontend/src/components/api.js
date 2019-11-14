import axios from 'axios'

export const login = async (input) => {
  try {
    const result = await axios.post('/api/users/login', input, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return result.data.token
  } catch(error) {
    throw error
  }
}

export const signup = async (input) => {
  try {
    const result = await axios.post('/api/users', input, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return result.data.token
  } catch(error) {
    return error
  }
}

export const logout = async (token) => {
  try {
    const result = await axios.post('/api/users/logout', {}, {
      headers: {
        'Authorization': 'bearer ' + token}
    })
    return result
  } catch(error) {
    return error
  }
}