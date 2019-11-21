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

export const getRecipe = async (recipeID) => {
  try {
    const result = await axios.get(`/api/recipes/${recipeID}`)
    return result.data
  } catch(error) {
    return error
  }
}

export const fetchComments = async (recipeID) => {
  try {
    const result = await axios.get(`/api/recipes/${recipeID}/comments`)
    return result.data
  } catch (error) {
    return error
  }
}

export const postComment = async (token, recipeID, comment) => {
  try {
    const result = await axios.post(`/api/recipes/${recipeID}/comment`, JSON.stringify(comment), {
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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

export const getFollowingUsers = async (username) => {
  try {
    const result = await axios.get(`/api/users/${username}/following`)
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
    return result.data
  } catch (error) {
    return error
  }
}

export const removeRecipe = async (token, recipeID) => {
  try {
    const result = await axios.get(`/api/recipes/${recipeID}/remove`, {
      headers: {
        'Authorization': token
      }
    })
    return result.data
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
    return result.data
  } catch(error) {
    return error
  }
}

export const postRating = async (rating, id, userId) => {
  try {
    const result = await axios.put(`/api/recipes/${id}/rating/${userId}`, rating)
    return result
  } catch (error) {
    return error
  }
}

export const getRecipeRating = async (recipeID) => {
  try {
    const result = await axios.get(`/api/recipes/${recipeID}/rating`)
    return result.data
  } catch(error) {
    return error
  }
}

export const getOwnRating = async (recipeID, userID) => {
  try {
    const result = await axios.get(`/api/recipes/${recipeID}/rating/${userID}`)
    return result.data
  } catch(error) {
    return error
  }
}

export const getIsBookmarked = async (recipeID, username) => {
  try {
    const result = await axios.get(`/api/users/${username}/bookmarked/${recipeID}`)
    return result.data
  } catch(error) {
    return error
  }
}

export const postBookmark = async (recipeID, username, isBookmarked) => {
  try {
    const result = await axios.put(`/api/users/${username}/${isBookmarked}/${recipeID}`)
    return result
  } catch (error) {
    return error
  }
}
