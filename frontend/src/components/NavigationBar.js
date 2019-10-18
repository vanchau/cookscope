import React, { useState } from 'react';
import '../css/NavigationBar.css'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/logo2.png'

export const NavigationBar = () => {
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

	return (
		<Navbar
			className="navigation-bar d-flex justify-content-between sticky-top"
		>
			<div>
				<Link className="navbar-brand" to="/">
					<img className="logo-image" src={logo} alt="logo" />
				</Link>
			</div>

			<div>
				<Form inline className="mx-auto">
					<FormControl type="text" placeholder="Enter dish or ingredient(s)" className="search-bar form-size" />
					{/* <Button variant="search-button" type="submit">Search</Button> */}
				</Form>
			</div>

			<div>
				<Nav>
					<LinkContainer to="/create-recipe">
						<Button variant="outline-create-recipe-button" >
							Create recipe
						</Button>
					</LinkContainer>
					

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Oops, it seems like you're not logged in.</Modal.Title>
						</Modal.Header>
						
						<Modal.Body>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Enter password" />
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Log in
							</Button>
							<Button variant="primary" onClick={handleClose}>
								Sign up
							</Button>
						</Modal.Footer>
					</Modal>

					<NavDropdown title="Settings" id="basic-nav-dropdown" style={{ marginRight: '20px', marginLeft: '20px' }} >
						<LinkContainer to="/profile">
							<NavDropdown.Item>User profile</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to="/terms">
							<NavDropdown.Item>Terms of Service</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to="/privacy">
							<NavDropdown.Item>Privacy Policy</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/logout">
							<NavDropdown.Item>Log out</NavDropdown.Item>
						</LinkContainer>
					</NavDropdown>
				</Nav>
			</div>
		</Navbar>
	)
}