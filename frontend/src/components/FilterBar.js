import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import categories from '../assets/categories.json'
import '../css/FilterBar.css'

const FilterBar = () => {
  return (
    <React.Fragment>
      <div style={{height:'5em', background:'transparent'}}></div>
      <div className='filter-container fixed-top'>
        <Navbar className='filterbar fixed-top'>
          <Nav>
            <NavDropdown title='Categories' id='basic-nav-dropdown'>
              {Object.values(categories).map(category => (
                <NavDropdown.Item eventkey={category} key={category}>
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title='Difficulty'>
              <NavDropdown.Item eventkey='easy'>Easy</NavDropdown.Item>
              <NavDropdown.Item eventkey='medium'>Medium</NavDropdown.Item>
              <NavDropdown.Item eventkey='difficult'>Difficult</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Time'>
              <NavDropdown.Item>Under 15 minutes</NavDropdown.Item>
              <NavDropdown.Item>Under 30 minutes</NavDropdown.Item>
              <NavDropdown.Item>Under 45 minutes</NavDropdown.Item>
              <NavDropdown.Item>Under 1 hour</NavDropdown.Item>
              <NavDropdown.Item>Over 1 hour</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Special Diet'>
              <NavDropdown.Item>Vegetarian</NavDropdown.Item>
              <NavDropdown.Item>Vegan</NavDropdown.Item>
              <NavDropdown.Item>Dairy-free</NavDropdown.Item>
              <NavDropdown.Item>Gluten-free</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    </React.Fragment>
  )
}

export default FilterBar
