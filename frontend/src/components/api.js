import axios from 'axios'

export const login = async (input) => {
  try {
    const result = await axios.post('/api/users/login', input, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return result.data
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
    return result.data
  } catch(error) {
    return error
  }
}

export const getUserInfo = async (username) => {
  try {
    const result = await axios.get(`/api/users/${username}`)
    return result.data
  } catch(error) {
    return error
  }
}

export const getRecipes = async (username) => {
  try {
    const result = await axios.get(`/api/users/${username}/recipes`)
    return result.data
  } catch(error) {
    return error
  }
}

export const getBookmarkedRecipes = async (token, username) => {
  try {
    const result = await axios.get(`/api/users/${username}/bookmarked-recipes`, {
      headers: {
        'Authorization': token
      }
    })
    return result.data
  } catch(error) {
    return error
  }
}

export const getFollowingUsers = async (token, username) => {
  try {
    const result = await axios.get(`/api/users/${username}/following`, {
      headers: {
        'Authorization': token
      }
    })
    return result.data
  } catch(error) {
    return error
  }
}

export const postRecipe = async (token, recipe) => {
  try {
    const result = await axios.post('/api/recipes/', recipe, {
      headers: {
        'Authorization': token
      }
    })
    return result
  } catch (error) {
    return error
  }
}

export const logout = async (token) => {
  try {
    const result = await axios.post('/api/users/me/logout', {}, {
      headers: {
        'Authorization': token
      }
    })
    return result
  } catch(error) {
    return error
  }
}