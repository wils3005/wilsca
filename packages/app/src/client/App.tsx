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

import React from "react";
import ReactDOM from "react-dom";

const element = App();
const container = document.querySelector("#root");

ReactDOM.render(element, container);

export default function App(): JSX.Element {
  const date = new Date();
  const utcString = date.toUTCString();

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
              <Card.Header>Card Header</Card.Header>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle>Card Subtitle</Card.Subtitle>
                <Card.Text>Card Text</Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
              </Card.Body>
              <Card.Footer>
                Card Footer<span className="float-right">{utcString}</span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}
