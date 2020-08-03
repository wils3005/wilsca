import { Button, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import React from "react";
import logoIcon from "./assets/images/logo-icon.png";

export function MyNavbar(): JSX.Element {
  return (
    <Navbar bg="light" expand="lg">
      <Brand />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Collapse />
    </Navbar>
  );
}

export function Brand(): JSX.Element {
  return (
    <Navbar.Brand href="#home">
      <Image src={logoIcon}></Image>
    </Navbar.Brand>
  );
}

export function Collapse(): JSX.Element {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link href="#panda-ecosystem">THE ECOSYSTEM</Nav.Link>

        <NavDropdown title="SOLUTIONS" id="basic-nav-dropdown">
          <NavDropdown.Item href="#solutions/schools">
            FOR SCHOOLS
          </NavDropdown.Item>
          <NavDropdown.Item href="#solutions/agents">
            FOR AGENTS
          </NavDropdown.Item>
          <NavDropdown.Item href="#pricing">PRICING</NavDropdown.Item>
        </NavDropdown>

        <Nav.Link href="#about">ABOUT</Nav.Link>
        <Nav.Link href="#contact">CONTACT US</Nav.Link>
      </Nav>
      <Button>LOGIN</Button>
      <Button variant="panda-btn btn-dark">START NOW FOR FREE!</Button>
    </Navbar.Collapse>
  );
}
