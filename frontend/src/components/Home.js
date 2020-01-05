import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterBar from './FilterBar'
import RecipeList from './RecipeList'
import { GiBlockHouse } from 'react-icons/gi'

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedDifficulties, setSelectedDifficulties] = useState([])
  const [selectedTimes, setSelectedTimes] = useState([])
  const [selectedDiets, setSelectedDiets] = useState([])

  const { searchWords } = useParams()
  let search = []
  if (searchWords) {
    search = searchWords.split('+')
  }

  return (
    <div style={{display: 'flex', padding: 'auto', margin: 'auto'}}>
      <FilterBar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedDifficulties={selectedDifficulties}
        setSelectedDifficulties={setSelectedDifficulties}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
        selectedDiets={selectedDiets}
        setSelectedDiets={setSelectedDiets}
      />
      <RecipeList
        searchWords={search}
        selectedCategories={selectedCategories}
        selectedDifficulties={selectedDifficulties}
        selectedTimes={selectedTimes}
        selectedDiets={selectedDiets}
      />
    </div>
  )
}

export default Home