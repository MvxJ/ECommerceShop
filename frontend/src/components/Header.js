import { Navbar, Container, Nav } from 'react-bootstrap';
import React from "react";

function Header() {
    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">E-Commerce Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href=""><i className="fas fa-shopping-cart"></i>&nbsp;Cart</Nav.Link>
                            <Nav.Link href=""><i className="fas fa-user"></i>&nbsp;Log In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header