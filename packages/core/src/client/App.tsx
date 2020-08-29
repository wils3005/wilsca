import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { webSocket } from ".";

window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

export default function App(): JSX.Element {
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
              <Card.Body>
                <MyListGroup />
              </Card.Body>
              <Card.Footer>Card.Footer</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}

export function MyListGroup(): JSX.Element {
  const [messages, setMessage] = useState<string[]>([]);

  const handleMessage = (eventMessage: MessageEvent) => {
    const msg = String(eventMessage.data);
    setMessage(messages.concat(msg));
  };

  const style: Record<string, unknown> = { overflowY: "auto" };

  console.log({ webSocket });

  useEffect(() => {
    console.log({ webSocket });
    if (!(webSocket instanceof WebSocket)) return;

    webSocket.addEventListener("message", handleMessage);

    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  });

  return (
    <ListGroup style={style}>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>{message}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
