import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const auth = useAuthState();
  const { logout } = useAuthDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>MovieApp</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {auth && auth.isAuthenticated ? (
            <>
              <div className="me-3 text-white">Welcome, {auth.user?.name || auth.user?.username}</div>
              <Button variant="outline-light" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <div className="text-white">Not signed in</div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
