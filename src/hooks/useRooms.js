import { useContext } from 'react';
import RoomContext from '../context/RoomContext';

const useRooms = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error('useRooms must be used within a RoomProvider');
  }

  return context;
};

export default useRooms;
