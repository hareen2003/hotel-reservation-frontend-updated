// Constants
// Application-wide constants

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const ROOM_TYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  SUITE: 'suite',
  DELUXE: 'deluxe',
};

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};
