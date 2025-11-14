import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useExpense } from '../contexts/ExpenseContext';
import {
  getExpensesByUserId,
  addExpense as addExpenseAPI,
  updateExpense as updateExpenseAPI,
  deleteExpense as deleteExpenseAPI,
} from '../services/expenseService';
import { formatVND, formatDate, formatDateForAPI, formatDateForInput } from '../utils/formatters';

const Home = () => {
  const { user } = useAuth();
  const {
    expenses,
    filterCategory,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilterCategory,
  } = useExpense();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    try {
      const data = await getExpensesByUserId(user.id);
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a valid number greater than 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const expenseData = {
        userId: user.id,
        name: formData.name,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formatDateForAPI(formData.date),
      };

      const newExpense = await addExpenseAPI(expenseData);
      addExpense(newExpense);
      
      // Reset form
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category,
      date: formatDateForInput(expense.date),
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const expenseData = {
        userId: user.id,
        name: formData.name,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formatDateForAPI(formData.date),
      };

      const updatedExpense = await updateExpenseAPI(editingId, expenseData);
      updateExpense(updatedExpense);
      
      // Reset form
      setEditingId(null);
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpenseAPI(id);
        deleteExpense(id);
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleReset = () => {
    setEditingId(null);
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: '',
    });
    setErrors({});
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Calculate total expenses
  const filteredExpenses =
    filterCategory === 'All categories'
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);

  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + (typeof exp.amount === 'string' ? parseFloat(exp.amount) : exp.amount),
    0
  );

  // Get unique categories
  const categories = [...new Set(expenses.map((exp) => exp.category))];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container fluid className="py-4" style={{ flex: 1 }}>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Total of Expenses</Card.Title>
                <h3 className="text-primary">{formatVND(totalExpenses)}</h3>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>{editingId ? 'Edit Expense' : 'Add Expense'}</Card.Title>
                <Form onSubmit={editingId ? handleUpdateExpense : handleAddExpense}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="date"
                      placeholder="dd/MM/yyyy"
                      value={formData.date}
                      onChange={handleInputChange}
                      isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button variant="primary" type="submit">
                      {editingId ? 'Save' : 'Add expense'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select value={filterCategory} onChange={handleFilterChange}>
                    <option>All categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Expense Management</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No expenses found
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.name}</td>
                          <td>{formatVND(expense.amount)}</td>
                          <td>{expense.category}</td>
                          <td>{formatDate(expense.date)}</td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditClick(expense)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
