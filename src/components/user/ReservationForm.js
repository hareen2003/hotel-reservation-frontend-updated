import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomContext from '../../context/RoomContext';
import '../../styles/ReservationForm.css';

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRoomById } = useContext(RoomContext);

  const room = getRoomById(id);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(room ? Math.min(1, room.guests) : 1);

  useEffect(() => {
    if (!room) {
      navigate('/search');
    }
  }, [room, navigate]);

  const calcNights = (inDate, outDate) => {
    try {
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch (e) {
      return 1;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nights = calcNights(checkIn, checkOut);
    const booking = {
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      roomType: room.type,
      pricePerNight: room.price,
      checkIn,
      checkOut,
      guests: Number(guests) || 1,
      nights,
      totalPrice: room.price * nights
    };

    console.log('Booking data to save:', booking);
    sessionStorage.setItem('reservationData', JSON.stringify(booking));
    console.log('Booking data saved to sessionStorage');
    
    // Navigate to payment page
    navigate('/reserve/' + room.id + '/payment');
  };

  if (!room) return null;

  const nights = checkIn && checkOut ? calcNights(checkIn, checkOut) : 0;
  const subtotal = nights * room.price;

  return (
    <div className="reservation-page-container">
      <div className="reservation-wrapper">
        
        {/* Left Side - Room Summary */}
        <div className="room-summary-card">
          <div className="room-image-container">
            <img src={room.image} alt={room.name} />
            <div className="room-badge">{room.type}</div>
          </div>
          
          <div className="room-details-section">
            <h2>{room.name}</h2>
            
            <div className="room-features">
              <div className="feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <span>{room.beds || 2} Beds</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <span>Up to {room.guests} Guests</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{room.location || 'Premium Location'}</span>
              </div>
            </div>

            <div className="price-display">
              <div className="price-amount">
                <span className="currency">$</span>
                <span className="amount">{room.price}</span>
              </div>
              <span className="price-label">per night</span>
            </div>

            {room.amenities && (
              <div className="amenities-preview">
                <h4>Amenities</h4>
                <div className="amenities-list">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="amenity-tag">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Reservation Form */}
        <div className="reservation-form-card">
          <div className="form-header">
            <h1>Complete Your Reservation</h1>
            <p>Fill in your booking details below</p>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            
            <div className="form-section">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Booking Dates
              </h3>
              
              <div className="date-inputs-row">
                <div className="form-group">
                  <label htmlFor="checkIn">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    Check-in Date
                  </label>
                  <input 
                    type="date" 
                    id="checkIn"
                    value={checkIn} 
                    onChange={e => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Check-out Date
                  </label>
                  <input 
                    type="date" 
                    id="checkOut"
                    value={checkOut} 
                    onChange={e => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                Guest Information
              </h3>
              
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <div className="guest-selector">
                  <button 
                    type="button" 
                    className="guest-btn"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <input 
                    type="number" 
                    id="guests"
                    min="1" 
                    max={room.guests} 
                    value={guests} 
                    onChange={e => setGuests(Math.min(room.guests, Math.max(1, Number(e.target.value))))}
                    readOnly
                  />
                  <button 
                    type="button" 
                    className="guest-btn"
                    onClick={() => setGuests(Math.min(room.guests, guests + 1))}
                    disabled={guests >= room.guests}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
                <small className="guest-info">Maximum {room.guests} guests allowed</small>
              </div>
            </div>

            {/* Price Summary */}
            {nights > 0 && (
              <div className="booking-summary">
                <h3>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                  Price Summary
                </h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>${room.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span className="summary-value">${subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Service Fee</span>
                    <span className="summary-value">$0</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span className="total-value">${subtotal}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit-button">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Proceed to Payment
              </button>
              
              <button 
                type="button" 
                className="back-button"
                onClick={() => navigate('/search')}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
