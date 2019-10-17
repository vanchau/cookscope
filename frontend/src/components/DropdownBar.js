import React from 'react';
import { DropdownButton, Dropdown, ButtonToolbar} from 'react-bootstrap';
import categories from '../assets/categories.json'
import '../css/DropdownBar.css'

const DropdownBar = () => {
	return (
		<div className='dropdown-container'>
			<ButtonToolbar>
      <DropdownButton title='Categories'>
				{Object.values(categories).map(category => (
				<Dropdown.Item eventkey={category} key={category}>
					{category}
				</Dropdown.Item>
				))}
			</DropdownButton>	
			<DropdownButton title='Difficulty'>
				<Dropdown.Item eventkey='easy'>Easy</Dropdown.Item>
				<Dropdown.Item eventkey='medium'>Medium</Dropdown.Item>
				<Dropdown.Item eventkey='difficult'>Difficult</Dropdown.Item>
			</DropdownButton>	
			<DropdownButton title='Time'>
				<Dropdown.Item>Under 15 minutes</Dropdown.Item>
				<Dropdown.Item>Under 30 minutes</Dropdown.Item>
				<Dropdown.Item>Under 45 minutes</Dropdown.Item>
				<Dropdown.Item>Under 1 hour</Dropdown.Item>
				<Dropdown.Item>Over 1 hour</Dropdown.Item>
			</DropdownButton>
			<DropdownButton title='Special Diet'>
				<Dropdown.Item>Vegetarian</Dropdown.Item>
				<Dropdown.Item>Vegan</Dropdown.Item>
				<Dropdown.Item>Dairy-free</Dropdown.Item>
				<Dropdown.Item>Gluten-free</Dropdown.Item>
			</DropdownButton>

</ButtonToolbar>
			
		</div>
	);
};

export default DropdownBar;

