//LoginForm component is used to render a login form with username and password fields, including validation and error handling.
import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';  

function LoginForm({ onSubmit }) {
  const initialState = {
    username: '',
    password: '',
    errors: {},
    showModal: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_ERRORS':
        return { ...state, errors: action.errors };
      case 'SET_ERROR':
        return { ...state, errors: { ...state.errors, [action.field]: action.message } };
      case 'CLEAR_ERROR': {
        const { [action.field]: _, ...rest } = state.errors;
        return { ...state, errors: rest };
      }
      case 'SHOW_MODAL':
        return { ...state, showModal: true };
      case 'CLOSE_MODAL':
        return { ...state, showModal: false, username: '', password: '', errors: {} };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal } = state;

  //Xử lý thay đổi input
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_FIELD', field: 'username', value });
    if (value.trim() === '') {
      dispatch({ type: 'SET_ERROR', field: 'username', message: 'Username is required' });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: 'username' });
    }
  }

  //Xử lý thay đổi password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_FIELD', field: 'password', value });
    if (value.trim() === '') {
      dispatch({ type: 'SET_ERROR', field: 'password', message: 'Password is required' });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: 'password' });
    }
  }

  //Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const newErrors = {};
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    if (Object.keys(newErrors).length === 0) {
      //onSubmit({ username, password });
      dispatch({ type: 'SHOW_MODAL' }); // Hiển thị modal khi không có lỗi
    }
  }

  //Đóng modal
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
            <Card>
                <Card.Header>
                    <h3 className="text-center">Login</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>  
                        <Form.Group controlId="username" className="mb-3 text-start fs-5">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text"
                                value={username}
                                onChange={handleUsernameChange} 
                                isInvalid={!!errors.username}
                                placeholder="Enter username"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3 text-start fs-5">  
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                value={password}
                                onChange={handlePasswordChange} 
                                isInvalid={!!errors.password}   
                                placeholder="Enter password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>   
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
        </Row>
         {/* Modal hiển thị khi đăng nhập thành công */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome, {username}!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  );
}

export default LoginForm;