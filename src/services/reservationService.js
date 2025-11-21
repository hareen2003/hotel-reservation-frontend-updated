// Reservation Service
// API calls related to reservation operations

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const reservationService = {
  createReservation: async (reservationData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) throw new Error('Failed to create reservation');
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  getReservationById: async (reservationId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch reservation');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  getUserReservations: async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch reservations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  cancelReservation: async (reservationId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to cancel reservation');
      return await response.json();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      throw error;
    }
  },

  getAllReservations: async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch all reservations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },
};

export default reservationService;
