import { Col, Container, Row } from "react-bootstrap";
import React from "react";

export default function App(): JSX.Element {
  const date = new Date();
  const utcString = date.toUTCString();

  return (
    <React.StrictMode>
      <Container>
        <Row>
          <Col>
            <p>{utcString}</p>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}
