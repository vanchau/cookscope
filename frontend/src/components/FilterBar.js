import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import '../css/FilterBar.css'
import FilterDropdown from './FilterDropdown'

const FilterBar = (props) => {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedDifficulties,
    setSelectedDifficulties,
    setSelectedTimes,
    selectedTimes,
    selectedDiets,
    setSelectedDiets
  } = props

  const categories = [
                      "Dinner",
                      "Dessert",
                      "Appetizer",
                      "Breakfast",
                      "Snack",
                      "Baking",
                      "Pork",
                      "Chicken",
                      "Fish",
                      "Beef",
                      "Bread",
                      "Casserole",
                      "Pasta",
                      "Salad",
                      "Soup",
                      "Slow cooker",
                      "Budget friendly",
                      "Healthy",
                      "Kid friendly"
                      ]
  const difficulties = ['Easy', 'Medium', 'Challenging']
  const times = [
                'Under 15 minutes',
                'Under 30 minutes',
                'Under 45 minutes', 
                'Under 1 hour'
                ]
  const diets = [
                'Vegetarian',
                'Vegan',
                'Dairy-free',
                'Gluten-free'
                ]


  return (
    <React.Fragment>
      <div style={{height:'5em', background:'transparent'}}></div>
      <div className='filter-container fixed-top'>
        <Navbar className='filterbar fixed-top'>
          <Nav>
          <FilterDropdown title='Categories' items={categories} selectedItems={selectedCategories} setSelectedItems={setSelectedCategories} />  
          <FilterDropdown title='Difficulty' items={difficulties} selectedItems={selectedDifficulties} setSelectedItems={setSelectedDifficulties} />
          <FilterDropdown title='Time' items={times} selectedItems={selectedTimes} setSelectedItems={setSelectedTimes} />
          <FilterDropdown title='Special Diet' items={diets} selectedItems={selectedDiets} setSelectedItems={setSelectedDiets} />
          </Nav>
        </Navbar>
      </div>
    </React.Fragment>
  )
}

export default FilterBar