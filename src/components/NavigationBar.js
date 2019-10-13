import React, { useState } from 'react';
import '../css/NavigationBar.css'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import logo from '../assets/logo.png'

export const NavigationBar = () => {
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (
		<Navbar className="d-flex justify-content-between">
			<div>
				<a className="navbar-brand" href="/">
					<img className="logo-image" src={logo} alt="logo" />
				</a>
			</div>

			<div>
				<Form inline className="mx-auto">
					<FormControl type="text" placeholder="Enter dish or ingredient(s)" className=" form-size" />
					<Button variant="search-button" type="submit">Search</Button>
				</Form>
			</div>

			<div>
				<Nav>
					<Button variant="create-recipe-button" onClick={handleShow}>
						Create recipe
					</Button>
					

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Oops, it seems that you're not logged in.</Modal.Title>
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

					<NavDropdown title="Settings" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">User profile</NavDropdown.Item>
						<NavDropdown.Item href="/terms">Terms of Service</NavDropdown.Item>
						<NavDropdown.Item href="/privacy">Privacy Policy</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</div>
		</Navbar>
	)
}