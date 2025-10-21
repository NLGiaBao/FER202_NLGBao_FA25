import React, { useReducer, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// Regex helpers
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&        // uppercase
  /[a-z]/.test(v) &&        // lowercase
  /\d/.test(v) &&           // number
  /[^A-Za-z0-9]/.test(v) && // special char
  v.length >= 8;            // length

const initialState = {
  form: { username: '', email: '', password: '', confirm: '' },
  errors: {},
  showModal: false,
  showToast: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.name]: action.message } };
    case 'CLEAR_ERROR': {
      const { [action.name]: _, ...rest } = state.errors;
      return { ...state, errors: rest };
    }
    case 'SHOW_MODAL':
      return { ...state, showModal: true };
    case 'HIDE_MODAL':
      return { ...state, showModal: false };
    case 'SHOW_TOAST':
      return { ...state, showToast: true };
    case 'HIDE_TOAST':
      return { ...state, showToast: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Validate từng trường
  const validate = (field, value) => {
    switch (field) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (!isUsername(value)) return '≥ 3 chars, letters/numbers/._ only, no spaces';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isEmail(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!isStrongPassword(value)) return '≥8 chars, upper, lower, number, special';
        return '';
      case 'confirm':
        if (!value) return 'Please confirm password';
        if (value !== state.form.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  // Memo hóa lỗi cho toàn bộ form (dùng để bật/tắt nút submit)
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field]);
      if (err) e[field] = err;
    });
    return e;
  }, [state.form]);

  const isValid = Object.keys(formErrors).length === 0;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', name, value });
    const err = validate(name, value);
    if (err) dispatch({ type: 'SET_ERROR', name, message: err });
    else dispatch({ type: 'CLEAR_ERROR', name });
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field]);
      if (err) newErrors[field] = err;
    });
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SHOW_TOAST' });
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  // Xử lý reset form / đóng modal
  const handleCancel = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3 text-start fs-5">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.form.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3 text-start fs-5">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.form.email}
                    onChange={handleChange}
                    isInvalid={!!state.errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3 text-start fs-5">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.form.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirm" className="mb-3 text-start fs-5">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={state.form.confirm}
                    onChange={handleChange}
                    isInvalid={!!state.errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="w-100">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo submit thành công */}
      <Toast
        show={state.showToast}
        onClose={() => dispatch({ type: 'HIDE_TOAST' })}
        delay={2000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: 220,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={state.showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {state.form.username}</p>
              <p><strong>Email:</strong> {state.form.email}</p>
              <p><strong>Password:</strong> {state.form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpForm;