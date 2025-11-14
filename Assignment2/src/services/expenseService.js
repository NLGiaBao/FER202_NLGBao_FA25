import api from './api';

export const getExpensesByUserId = async (userId) => {
  try {
    const response = await api.get('/expenses', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await api.post('/expenses', expense);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    await api.delete(`/expenses/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};

