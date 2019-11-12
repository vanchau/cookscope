import { useState, useEffect } from 'react'
import axios from 'axios'

const parseRecipe = (recipe) => {
  let parsedRecipe = recipe
  parsedRecipe.ingredients = recipe.ingredients.filter(i => !/^\s*$/.test(i.ingredient))
  parsedRecipe.instructions = recipe.instructions.filter(i => !/^\s*$/.test(i.instruction))
  return parsedRecipe
}

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [completed, setToCompleted] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) {
        // TODO http POST logic here
        const postRecipe = async () => {
          try {
            const parsedRecipe = parseRecipe(values)
            const result = await axios.post('/api/recipes/', parsedRecipe)
            if (result.status === 200) {
              setToCompleted(true)
              // eslint-disable-next-line no-console
              console.log(parsedRecipe)
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        }
        postRecipe()
        setSubmitting(false)
      } else {
        setSubmitting(false)
      }
    }
  }, [errors, isSubmitting, values])

  const handleClose = () => {
    setErrors({})
    setSubmitting(false)
    setToCompleted(false)
    setValues(initialState)
  }

  const handleChange = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value
    let newValue = ''

    switch (targetName) {
        case 'categories':
          const checked = event.target.checked
          if (checked) newValue = [...values.categories, targetValue]
          else newValue = values.categories.filter(category => category !== targetValue)
          break
        case 'timeToCook':
          newValue = parseInt(targetValue, 10)
          break
        case 'servings':
          newValue = parseInt(targetValue, 10)
          break
        case 'ingredients':
          const ingredientID = parseInt(event.target.id, 10)
          newValue = values.ingredients
          newValue[newValue.findIndex(x => x.id === ingredientID)] = { ingredient: targetValue, id: ingredientID }
          break
        case 'instructions':
          const instructionID = parseInt(event.target.id, 10)
          newValue = values.instructions
          newValue[newValue.findIndex(x => x.id === instructionID)] = { instruction: targetValue, id: instructionID }
          break
        default:
          newValue = event.target.value
    }

    setValues({
      ...values,
      [event.target.name]: newValue
    })
  }

  const setImageFile = (file) => {
    setValues({
      ...values,
      imageFile: file
    })
  }

  const addIngredient = () => {
    const numOfIngredients = values.ingredients.length
    const newID = numOfIngredients === 0 ? 1 : values.ingredients[numOfIngredients - 1].id + 1
    setValues({
      ...values,
      ingredients: [ ...values.ingredients, { ingredient: '', id: newID } ]
    })
  }

  const removeIngredient = (id) => {
    const updatedList = values.ingredients.filter(obj => obj.id !== id)
    setValues({
      ...values,
      ingredients: [ ...updatedList]
    })
  }

  const addInstruction = () => {
    const numOfInstructions = values.instructions.length
    const newID = numOfInstructions === 0 ? 1 : values.instructions[numOfInstructions - 1].id + 1
    setValues({
      ...values,
      instructions: [ ...values.instructions, { instruction: '', id: newID } ]
    })
  }

  const removeInstruction = (id) => {
    const updatedList = values.instructions.filter(obj => obj.id !== id)
    setValues({
      ...values,
      instructions: updatedList
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
  }

  return {
    handleChange,
    handleSubmit,
    handleClose,
    setImageFile,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    errors,
    completed,
    values
  }
}

export default useFormValidation
