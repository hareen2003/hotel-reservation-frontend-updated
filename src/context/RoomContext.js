import React, { createContext, useState, useEffect } from 'react';
import roomService from '../services/roomService';

const RoomContext = createContext();

const MOCK_ROOMS = [
  {
    id: 'r1',
    name: 'City View Deluxe',
    type: 'deluxe',
    price: 129,
    beds: 2,
    guests: 3,
    image: 'https://media.istockphoto.com/id/533338000/photo/interior-of-a-hotel-bedroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=5G-nPW2oxTBWMljIGrr09eRiAn6LsWbFxE8EGsSNz6Q='
  },
  {
    id: 'r2',
    name: 'Suite with Balcony',
    type: 'suite',
    price: 229,
    beds: 2,
    guests: 4,
    image: 'https://plus.unsplash.com/premium_photo-1681487479203-464a22302b27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVscyUyMHJvb218ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'r3',
    name: 'Cozy Single Room',
    type: 'single',
    price: 79,
    beds: 1,
    guests: 1,
    image: 'https://plus.unsplash.com/premium_photo-1678297270523-8775c817d0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWxzJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D'
  }
];

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch rooms from backend on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomService.getAllRooms();
      setRooms(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Error fetching rooms, using mock data:', err);
      // Keep mock data as fallback
      setError('Failed to load rooms from server');
    } finally {
      setLoading(false);
    }
  };

  const getRoomById = (id) => rooms.find((r) => String(r.id) === String(id));

  const searchRooms = async (filters) => {
    try {
      const data = await roomService.searchRooms(filters);
      return Array.isArray(data) ? data : [data];
    } catch (err) {
      console.error('Error searching rooms:', err);
      // Fallback to local filtering
      return rooms.filter((r) => {
        if (filters.guests && r.guests < filters.guests) return false;
        if (filters.type && filters.type !== 'any' && r.type !== filters.type) return false;
        return true;
      });
    }
  };

  return (
    <RoomContext.Provider value={{ rooms, getRoomById, searchRooms, loading, error, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
