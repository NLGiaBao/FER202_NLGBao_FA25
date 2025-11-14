import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.get('/users');
    const users = response.data;
    
    // Find user by username and password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    
    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
        },
        token: `token_${user.id}_${Date.now()}`,
      };
    }
    
    return {
      success: false,
      message: 'Invalid username or password',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Login failed. Please try again.',
    };
  }
};

