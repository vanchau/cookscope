import React from 'react'
import '../css/FilterDropdown.css'

const FilterDropdown = (props) => {
  const {
    title,
    items,
    selectedItems,
    setSelectedItems
  } = props

  const handleClick = (event) => {
    if (selectedItems.includes(event.target.value)) {
      setSelectedItems(selectedItems.filter(item => item !== event.target.value))
    }
    else { 
      setSelectedItems(selectedItems.concat(event.target.value))
    }
  } 

  return (
    <div className="dropdown">
    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {title}
    </button>
    <form className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      {items.map(item => 
        <label key={item} className="dropdown-item"><input className="dropdown-checkbox" onChange={(event) => handleClick(event)} type="checkbox" value={item}/>{item}</label>
        )}
    </form>
  </div>
  )
}

export default FilterDropdown