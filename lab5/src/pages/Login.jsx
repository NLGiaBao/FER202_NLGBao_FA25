import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuthDispatch } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuthDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(username.trim(), password);
    setLoading(false);
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
    // On success, auth state in provider will change and App will show movie list
  };

  return (
    <Container style={{ maxWidth: 420 }} className="mt-5">
      <h2 className="mb-3">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      </Form>
    </Container>
  );
}

export default Login;
