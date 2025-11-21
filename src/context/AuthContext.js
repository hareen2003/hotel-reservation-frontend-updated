import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/userService';

const AuthContext = createContext();

const CURRENT_USER_KEY = 'hrs_current_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
      setIsAuthenticated(false);
    }
  }, [user]);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.register(userData);
      setUser(response.user || response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.login(email, password);
      setUser(response.user || response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await userService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, register, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
