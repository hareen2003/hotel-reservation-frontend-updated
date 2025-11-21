import { useContext } from 'react';
import ReservationContext from '../context/ReservationContext';

const useReservations = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }

  return context;
};

export default useReservations;
