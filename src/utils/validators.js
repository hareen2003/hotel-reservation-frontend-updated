// Validators
// Validation functions for form data and user input

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateReservationDates = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkOutDate > checkInDate;
};

export const validateUserData = (userData) => {
  const errors = {};

  if (!userData.firstName || userData.firstName.trim() === '') {
    errors.firstName = 'First name is required';
  }

  if (!userData.lastName || userData.lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  }

  if (!userData.email || !validateEmail(userData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!userData.phone || !validatePhoneNumber(userData.phone)) {
    errors.phone = 'Valid phone number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateReservationData = (reservationData) => {
  const errors = {};

  if (!reservationData.roomId) {
    errors.roomId = 'Room selection is required';
  }

  if (!validateReservationDates(reservationData.checkIn, reservationData.checkOut)) {
    errors.dates = 'Check-out date must be after check-in date';
  }

  if (!reservationData.guests || reservationData.guests <= 0) {
    errors.guests = 'Number of guests is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
