import React, { useContext } from 'react';
import '../../styles/BookingHistory.css';
import ReservationContext from '../../context/ReservationContext';
import useAuth from '../../hooks/useAuth';
import Icon from '../common/Icon';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const { reservations, cancelReservation } = useContext(ReservationContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const my = user ? reservations.filter(r => r.userId === user.id) : [];

  if (!user) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Please log in to view booking history</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
            <Icon name="user" /> Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container booking-history">
      <div className="booking-header card">
        <h1><Icon name="calendar" size={32} /> Your Booking History</h1>
        <p className="muted">View and manage all your reservations</p>
      </div>

      {my.length === 0 ? (
        <div className="card empty-bookings">
          <p>No bookings yet. Ready to make your first reservation?</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>
            <Icon name="search" /> Search Rooms
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {my.map(r => (
            <details key={r.id} className="booking-card card">
              <summary>
                <div className="booking-summary">
                  <div className="booking-info">
                    <h3>{r.roomName || 'Room'}</h3>
                    <p className="muted">
                      <Icon name="calendar" size={14} style={{marginRight: 4}} />
                      {r.checkIn} → {r.checkOut}
                    </p>
                  </div>
                  <div className="booking-stats">
                    <span><Icon name="users" size={16} /> {r.guests || 1} guests</span>
                    <strong>${r.totalPrice || r.total || '—'}</strong>
                  </div>
                </div>
                <Icon name="chevron-down" size={20} />
              </summary>

              <div className="booking-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <h4>Check-in Date</h4>
                    <p>{r.checkIn}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Check-out Date</h4>
                    <p>{r.checkOut}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Number of Guests</h4>
                    <p>{r.guests || 1}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Room Type</h4>
                    <p>{r.roomType || 'Standard'}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Total Price</h4>
                    <p className="price">${r.totalPrice || r.total || '—'}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Status</h4>
                    <p className="status-confirmed">Confirmed</p>
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="btn btn-primary" onClick={() => navigate(`/room/${r.roomId}`)}>
                    <Icon name="eye" /> View Room
                  </button>
                  <button className="btn btn-outline" onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                      cancelReservation(r.id);
                    }
                  }}>
                    <Icon name="trash" /> Cancel Booking
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
