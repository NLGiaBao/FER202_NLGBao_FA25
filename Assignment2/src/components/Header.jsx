import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" style={{ backgroundColor: '#ffffff' }}>
      <Navbar.Brand className="ms-3 d-flex align-items-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ width: '30px', height: '30px', marginRight: '10px' }}
        />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000000' }}>
          PersonalBudget
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-3">
          <Nav.Item className="d-flex align-items-center me-3" style={{ color: '#000000' }}>
            Signed in as {user?.fullName}
          </Nav.Item>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
