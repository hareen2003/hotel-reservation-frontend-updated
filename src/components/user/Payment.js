import React, { useState, useEffect, useContext } from 'react';
import '../../styles/Payment.css';
import { useNavigate } from 'react-router-dom';
import ReservationContext from '../../context/ReservationContext';
import useAuth from '../../hooks/useAuth';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createReservation } = useContext(ReservationContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });
  const [showCvvTooltip, setShowCvvTooltip] = useState(false);

  // Get reservation data from sessionStorage
  const [bookingDetails, setBookingDetails] = useState({});

  useEffect(() => {
    const storedData = sessionStorage.getItem('reservationData');
    console.log('Payment component mounted, stored data:', storedData);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Parsed booking details:', parsedData);
        setBookingDetails(parsedData);
      } catch (error) {
        console.error('Error parsing booking details:', error);
        navigate('/search');
      }
    } else {
      console.warn('No reservation data found in sessionStorage');
      navigate('/search');
    }
    setIsLoading(false);
  }, [navigate]);

  // Calculate tax (10% of subtotal)
  const subtotal = (bookingDetails.pricePerNight || 0) * (bookingDetails.nights || 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  // Detect card type based on number
  const detectCardType = (number) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return '';
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      setCardNumber(formatted);
      setCardType(detectCardType(value));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the reservation after successful payment
    const reservation = {
      ...bookingDetails,
      paymentMethod,
      paymentStatus: 'completed',
      paidAmount: total
    };

    createReservation(reservation);

    // Clear reservation data
    sessionStorage.removeItem('reservationData');

    // Navigate to bookings page
    navigate('/bookings');
  };

  if (isLoading) {
    return (
      <div className="payment-container">
        <div className="loading-spinner">Loading payment page...</div>
      </div>
    );
  }

  if (!bookingDetails.roomId) {
    return null;
  }

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Booking Summary */}
        <div className="booking-summary">
          <h2>Booking Summary</h2>

          <div className="summary-card">
            <div className="hotel-info">
              <div className="hotel-image">
                <img 
                  src={bookingDetails.roomImage || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80'} 
                  alt={bookingDetails.roomName} 
                />
              </div>
              <div className="hotel-details">
                <h3>{bookingDetails.roomName || 'Room'}</h3>
                <p className="room-type">{bookingDetails.roomType || 'Standard'}</p>
              </div>
            </div>

            <div className="stay-details">
              <div className="detail-row">
                <span className="label">Check-in</span>
                <span className="value">{bookingDetails.checkIn}</span>
              </div>
              <div className="detail-row">
                <span className="label">Check-out</span>
                <span className="value">{bookingDetails.checkOut}</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration</span>
                <span className="value">{bookingDetails.nights} {bookingDetails.nights === 1 ? 'night' : 'nights'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Guests</span>
                <span className="value">{bookingDetails.guests}</span>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>${bookingDetails.pricePerNight} × {bookingDetails.nights} {bookingDetails.nights === 1 ? 'night' : 'nights'}</span>
                <span>${subtotal}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees (10%)</span>
                <span>${tax}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span className="total-amount">${total}</span>
              </div>
            </div>
          </div>

          <div className="security-badges">
            <div className="badge">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="badge">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="payment-form-section">
          <h1>Payment Details</h1>
          <p className="subtitle">Complete your booking securely</p>

          {/* Payment Method Selection */}
          <div className="payment-methods">
            <button 
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Credit Card
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.32 21.97a.546.546 0 01-.26-.32c-.03-.15-.01-.3.06-.43l2.53-6.82H8.14c-.32 0-.58-.09-.74-.26-.15-.17-.2-.39-.13-.64l2.67-9.83c.07-.25.21-.44.41-.55.2-.11.43-.13.65-.07.23.07.42.23.53.45.11.22.12.47.04.7L9.24 10.4h2.88c.23 0 .43.07.57.21.14.13.21.31.19.52-.02.1-.05.2-.1.29l-4.15 10.25c-.13.32-.41.52-.73.52-.19 0-.37-.08-.5-.22z"/>
              </svg>
              PayPal
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('bank')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Bank Transfer
            </button>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <form className="payment-form" onSubmit={handleSubmit}>
              {/* Accepted Cards */}
              <div className="accepted-cards">
                <span>We accept:</span>
                <div className="card-logos">
                  <div className={`card-logo ${cardType === 'visa' ? 'active' : ''}`}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                  </div>
                  <div className={`card-logo ${cardType === 'mastercard' ? 'active' : ''}`}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                  </div>
                  <div className={`card-logo ${cardType === 'amex' ? 'active' : ''}`}>
                    <span className="amex-text">AMEX</span>
                  </div>
                  <div className={`card-logo ${cardType === 'discover' ? 'active' : ''}`}>
                    <span className="discover-text">DISCOVER</span>
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                    required
                  />
                  {cardType && (
                    <div className="card-type-indicator">
                      <img 
                        src={`https://upload.wikimedia.org/wikipedia/commons/${
                          cardType === 'visa' ? '0/04/Visa.svg' : '2/2a/Mastercard-logo.svg'
                        }`} 
                        alt={cardType} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="form-group">
                <label htmlFor="cardholderName">Name on Card</label>
                <input
                  type="text"
                  id="cardholderName"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="form-row">
                <div className="form-group expiry-group">
                  <label>Expiry Date</label>
                  <div className="expiry-inputs">
                    <select
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span className="separator">/</span>
                    <select
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() % 100 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group cvv-group">
                  <label htmlFor="cvv">
                    CVV
                    <button
                      type="button"
                      className="cvv-help"
                      onMouseEnter={() => setShowCvvTooltip(true)}
                      onMouseLeave={() => setShowCvvTooltip(false)}
                    >
                      ?
                    </button>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className="form-input"
                    required
                  />
                  {showCvvTooltip && (
                    <div className="cvv-tooltip">
                      <p><strong>3 digits</strong> on the back for Visa/Mastercard</p>
                      <p><strong>4 digits</strong> on the front for Amex</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Card Checkbox */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                  />
                  <span>Save card for future bookings</span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="pay-button">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Pay ${total} Securely
              </button>

              <p className="secure-notice">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Your payment information is encrypted and secure
              </p>
            </form>
          )}

          {/* PayPal Section */}
          {paymentMethod === 'paypal' && (
            <div className="alternative-payment">
              <div className="payment-info">
                <svg width="64" height="64" fill="#0070ba" viewBox="0 0 24 24">
                  <path d="M8.32 21.97a.546.546 0 01-.26-.32c-.03-.15-.01-.3.06-.43l2.53-6.82H8.14c-.32 0-.58-.09-.74-.26-.15-.17-.2-.39-.13-.64l2.67-9.83c.07-.25.21-.44.41-.55.2-.11.43-.13.65-.07.23.07.42.23.53.45.11.22.12.47.04.7L9.24 10.4h2.88c.23 0 .43.07.57.21.14.13.21.31.19.52-.02.1-.05.2-.1.29l-4.15 10.25c-.13.32-.41.52-.73.52-.19 0-.37-.08-.5-.22z"/>
                </svg>
                <p>Click below to complete your payment securely through PayPal</p>
              </div>
              <button className="paypal-button" onClick={handleSubmit}>
                Continue with PayPal
              </button>
            </div>
          )}

          {/* Bank Transfer Section */}
          {paymentMethod === 'bank' && (
            <div className="alternative-payment">
              <div className="payment-info">
                <svg width="64" height="64" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <h3>Bank Transfer Details</h3>
                <div className="bank-details">
                  <p><strong>Bank Name:</strong> Global Trust Bank</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>SWIFT Code:</strong> GTBXXX</p>
                  <p><strong>Amount:</strong> ${total}</p>
                </div>
              </div>
              <button className="bank-button" onClick={handleSubmit}>
                I've Completed the Transfer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
