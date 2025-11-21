import React, { useState, useEffect } from 'react';
import '../../styles/UserDashboard.css';
import useAuth from '../../hooks/useAuth';
import useReservations from '../../hooks/useReservations';
import Icon from '../common/Icon';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { reservations, cancelReservation } = useReservations();
  const [userReservations, setUserReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      const filtered = reservations.filter(r => r.userId === user.id);
      setUserReservations(filtered);
    }
  }, [reservations, user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Please log in to access your dashboard</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
            <Icon name="user" /> Go to Login
          </button>
        </div>
      </div>
    );
  }

  const upcomingCount = userReservations.filter(r => new Date(r.checkOut) > new Date()).length;
  const pastCount = userReservations.length - upcomingCount;

  // Extract first name from email or name field
  const firstName = user.firstName || user.name || user.email.split('@')[0] || 'Guest';

  return (
    <div className="page-container user-dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome back, <span className="welcome-name">{firstName}</span>! 👋</h1>
        <p>Here's what's happening with your bookings</p>
      </div>
      {/* Profile Header Card */}
      <div className="profile-header card">
        <div className="profile-avatar">
          <Icon name="user" size={48} />
        </div>
        <div className="profile-info">
          <h1>{user.email}</h1>
          <p className="muted">Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/profile')} title="Edit Profile">
          <Icon name="edit" /> Edit Profile
        </button>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon upcoming">
            <Icon name="calendar" size={32} />
          </div>
          <h3>{upcomingCount}</h3>
          <p>Upcoming Bookings</p>
        </div>

        <div className="stat-card card">
          <div className="stat-icon past">
            <Icon name="bed" size={32} />
          </div>
          <h3>{pastCount}</h3>
          <p>Past Stays</p>
        </div>

        <div className="stat-card card">
          <div className="stat-icon total">
            <Icon name="location" size={32} />
          </div>
          <h3>{userReservations.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">
            <Icon name="tag" size={32} />
          </div>
          <h3>${userReservations.reduce((sum, r) => sum + (r.totalPrice || 0), 0).toFixed(0)}</h3>
          <p>Total Spent</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn card" onClick={() => navigate('/search')}>
          <Icon name="search" size={28} />
          <span>Search Rooms</span>
        </button>
        <button className="action-btn card" onClick={() => navigate('/bookings')}>
          <Icon name="calendar" size={28} />
          <span>My Bookings</span>
        </button>
        <button className="action-btn card" onClick={() => navigate('/notifications')}>
          <Icon name="bell" size={28} />
          <span>Notifications</span>
        </button>
        <button className="action-btn card" onClick={() => navigate('/profile')}>
          <Icon name="user" size={28} />
          <span>Profile Settings</span>
        </button>
        <button className="action-btn card" onClick={logout}>
          <Icon name="logout" size={28} />
          <span>Logout</span>
        </button>
      </div>

      {/* Reservations Section */}
      <div className="reservations-section">
        <h2>Your Reservations</h2>

        {userReservations.length === 0 ? (
          <div className="card empty-state">
            <p>No reservations yet. Ready to book your next stay?</p>
            <button className="btn btn-primary" onClick={() => navigate('/search')}>
              <Icon name="search" /> Explore Rooms
            </button>
          </div>
        ) : (
          <div className="reservations-list">
            {userReservations.map(res => (
              <details key={res.id} className="reservation-item card">
                <summary>
                  <div className="res-summary">
                    <div className="res-info">
                      <h3>{res.roomName || 'Room'}</h3>
                      <p className="muted">
                        {res.checkIn} to {res.checkOut}
                      </p>
                    </div>
                    <div className="res-price">
                      <strong>${res.totalPrice || '—'}</strong>
                      <span className="badge badge-success">Confirmed</span>
                    </div>
                  </div>
                  <Icon name="chevron-down" size={20} />
                </summary>

                <div className="res-details">
                  <div className="detail-row">
                    <span>Check-in:</span>
                    <strong>{res.checkIn}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Check-out:</span>
                    <strong>{res.checkOut}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Guests:</span>
                    <strong>{res.guests || 1}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Room Type:</span>
                    <strong>{res.roomType || 'Standard'}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Status:</span>
                    <strong className="status-confirmed">Confirmed</strong>
                  </div>

                  <div className="res-actions" style={{ marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => navigate(`/room/${res.roomId}`)}>
                      <Icon name="eye" /> View Room
                    </button>
                    <button className="btn btn-outline" onClick={() => cancelReservation(res.id)}>
                      <Icon name="trash" /> Cancel
                    </button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
