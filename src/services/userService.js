// User Service
// API calls related to user operations

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const userService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      // Store token if provided
      if (data.token) localStorage.setItem('authToken', data.token);
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      // Store token if provided
      if (data.token) localStorage.setItem('authToken', data.token);
      return data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  getUserProfile: async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

export default userService;
