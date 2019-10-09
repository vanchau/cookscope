import React from 'react';
import '../css/NavigationBar.css'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap';

export const NavigationBar = () => (
	<Navbar className="navbar-bg justify-content-between">
		<Navbar.Brand href="/">CookScope</Navbar.Brand>
		<Form inline className="mx-auto">
			<FormControl type="text" placeholder="Enter dish or ingredient(s)" className="mr-sm-2" />
			<Button type="submit">Submit</Button>
		</Form>
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ml-auto">
				<Nav.Link href="/createrecipe">Create Recipe</Nav.Link>
				<NavDropdown title="Settings" id="basic-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				</NavDropdown>
			</Nav>    
  	</Navbar.Collapse>
	</Navbar>
)