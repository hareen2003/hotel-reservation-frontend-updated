// Room Service
// API calls related to room operations

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const roomService = {
  getAllRooms: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  searchRooms: async (filters) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.guests) queryParams.append('guests', filters.guests);
      if (filters.type && filters.type !== 'any') queryParams.append('type', filters.type);
      if (filters.checkIn) queryParams.append('checkIn', filters.checkIn);
      if (filters.checkOut) queryParams.append('checkOut', filters.checkOut);
      
      const response = await fetch(`${API_BASE_URL}/rooms/search?${queryParams}`);
      if (!response.ok) throw new Error('Failed to search rooms');
      return await response.json();
    } catch (error) {
      console.error('Error searching rooms:', error);
      throw error;
    }
  },

  getRoomById: async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
      if (!response.ok) throw new Error('Failed to fetch room');
      return await response.json();
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  },
};

export default roomService;
