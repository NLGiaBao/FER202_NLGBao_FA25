import React, { createContext, useContext, useState, useCallback } from 'react';
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext({ isAuthenticated: false, user: null });
const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const login = useCallback(async (username, password) => {
    try {
      const res = await movieApi.get('/accounts', { params: { username, password } });
      const users = res.data;
      if (users && users.length > 0) {
        const user = users[0];
        setAuth({ isAuthenticated: true, user });
        return { success: true, user };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (err) {
      console.error('Auth login error', err);
      return { success: false, message: 'Login failed' };
    }
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
  }, []);

  const dispatchValue = { login, logout };

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
