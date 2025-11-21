import React, { createContext, useState, useEffect } from 'react';
import reservationService from '../services/reservationService';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reservations from backend on mount
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return; // Only fetch if authenticated

    setLoading(true);
    setError(null);
    try {
      const data = await reservationService.getAllReservations();
      setReservations(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to load reservations');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (reservation) => {
    try {
      const newRes = await reservationService.createReservation(reservation);
      setReservations(prev => [newRes, ...prev]);
      return newRes;
    } catch (err) {
      console.error('Error creating reservation:', err);
      throw err;
    }
  };

  const cancelReservation = async (id) => {
    try {
      await reservationService.cancelReservation(id);
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error canceling reservation:', err);
      throw err;
    }
  };

  return (
    <ReservationContext.Provider value={{ reservations, createReservation, cancelReservation, loading, error, fetchReservations }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
