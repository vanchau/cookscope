import React from "react"

const useFormValidation = (initialState) => {
  const [values, setValues] = React.useState(initialState)
  //const [errors, setErrors] = React.useState({})

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
    // for now, this enables to see the console log output
    event.preventDefault()
    // eslint-disable-next-line no-console
    console.log(values)
  }


  return {
    handleChange,
    handleSubmit,
    setImageFile,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    values
  }
}

export default useFormValidation
