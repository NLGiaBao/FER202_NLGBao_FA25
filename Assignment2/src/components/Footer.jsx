import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '1rem 0',
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">© 2025 PersonalBudget Demo</p>
          </Col>
          <Col md={6} className="text-end">
            <p className="mb-0">Built with React, Redux Toolkit & JSON Server</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

