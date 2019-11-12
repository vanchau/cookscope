
const validateRecipeForm = (values) => {
  let errors = {}
  // title error
  if (!values.title) {
    errors.title = 'Please give your recipe a name.'
  }
  // imageFile error
  if (Object.entries(values.imageFile).length === 0 && values.imageFile.constructor === Object) {
    errors.imageFile = 'No image selected for the recipe.'
  }
  // timeToCook errors
  if (values.timeToCook === 0) {
    errors.timeToCook = 'Please provide an estimation of cooking time.'
  } else if (values.timeToCook < 0 || values.timeToCook > 1000 || !Number.isInteger(values.timeToCook)) {
    errors.timeToCook = 'The cooking time is not valid!'
  }
  // servings errors
  if (values.servings <= 0) {
    errors.servings = 'Please provide the number of servings for your recipe.'
  } else if (values.servings < 0 || values.servings > 100 || !Number.isInteger(values.servings)) {
    errors.servings = 'The number of servings is not valid!'
  }
  // categories error
  if (values.categories === undefined || values.categories.length === 0) {
    errors.categories = 'Please select at least one category for your recipe.'
  }
  // ingregients error
  if (values.ingredients === undefined || values.ingredients.length === 0) {
    errors.ingredients = 'You should provide at least one ingredient!'
  } else if (!values.ingredients.some(i => !/^\s*$/.test(i.ingredient))) {
    errors.ingredients = 'You should provide at least one ingredient!'
  }
  // instructions error
  if (values.instructions === undefined || values.instructions.length === 0) {
    errors.instructions = 'Please provide instructions!'
  } else if (!values.instructions.some(i => !/^\s*$/.test(i.instruction))) {
    errors.instructions = 'Please provide at least one instruction!'
  }
  return errors
}

export default validateRecipeForm