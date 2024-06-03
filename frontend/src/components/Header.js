import { Navbar, Container, Nav } from 'react-bootstrap';
import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand href="#">E-Commerce Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to={'/cart'}>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>&nbsp;Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/login'}>
                                <Nav.Link><i className="fas fa-user"></i>&nbsp;Log In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header