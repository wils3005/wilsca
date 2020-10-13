// import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";

import { addEventListeners, register } from "@wilsjs/service-worker";
import React from "react";
import ReactDOM from "react-dom";
import { log } from "@wilsjs/console-logger";

const {
  constructor: { name },
  document,
} = globalThis;

function Element(): JSX.Element {
  return (
    <React.StrictMode>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Navbar.Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Nav.Link 1</Nav.Link>
              <Nav.Link href="#link">Nav.Link 2</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  NavDropdown.Item 1
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  NavDropdown.Item 2
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  NavDropdown.Item 3
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  NavDropdown.Item 4
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline className="float-right">
              <FormControl />
              <Button>Button</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Row>
          <Col>
            <Card>
              <Card.Header>Card.Header</Card.Header>
              <Card.Body></Card.Body>
              <Card.Footer>Card.Footer</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}

function onLoad(): void {
  log();
  ReactDOM.render(<Element />, document.getElementById("root"));
  addEventListeners();
  void register();
}

if (name == "Window") {
  globalThis.addEventListener("load", onLoad);
}

export { Element, onLoad };
