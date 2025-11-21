import React, { useState, useEffect, useContext, useMemo } from 'react';
import '../../styles/Notifications.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import NotificationContext from '../../context/NotificationContext';
import ReservationContext from '../../context/ReservationContext';
import Icon from '../common/Icon';

const Notifications = () => {
  const { user } = useAuth();
  const { notifications, setNotifications } = useContext(NotificationContext);
  const { reservations } = useContext(ReservationContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, unread, bookings, services

  // Initialize notifications if empty
  useEffect(() => {
    if (notifications.length === 0) {
      const initialNotifications = [
        {
          id: '1',
          type: 'booking',
          title: 'Booking Confirmed',
          message: 'Your reservation has been confirmed. Check-in date is coming up!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          icon: '✓',
          color: '#10b981'
        },
        {
          id: '2',
          type: 'service',
          title: 'Room Service Available',
          message: 'Our 24/7 room service is now available for your convenience.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          icon: '🔔',
          color: '#3b82f6'
        },
        {
          id: '3',
          type: 'booking',
          title: 'Checkout Reminder',
          message: 'Your checkout is tomorrow at 11 AM. Please vacate the room on time.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          icon: '⏰',
          color: '#f59e0b'
        },
        {
          id: '4',
          type: 'service',
          title: 'Special Offer',
          message: 'Get 20% off on your next booking! Use code WELCOME20.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          icon: '🎁',
          color: '#ec4899'
        }
      ];
      setNotifications(initialNotifications);
    }
  }, []);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (filter === 'bookings') {
      filtered = filtered.filter(n => n.type === 'booking');
    } else if (filter === 'services') {
      filtered = filtered.filter(n => n.type === 'service');
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, filter]);

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Delete all
  const deleteAllNotifications = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  // Get unread count
  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  // Get booking notifications
  const bookingNotifications = useMemo(() => reservations.filter(r => r.userId === user?.id), [reservations, user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="notification-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Please log in to view notifications</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="notifications-header">
        <div className="header-content">
          <h1>
            <Icon name="bell" size={32} /> Notifications
          </h1>
          <p className="subtitle">Stay updated with your bookings and services</p>
        </div>
        {unreadCount > 0 && <div className="unread-badge">{unreadCount}</div>}
      </div>

      {/* Tabs & Actions */}
      <div className="notifications-controls">
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-btn ${filter === 'bookings' ? 'active' : ''}`}
            onClick={() => setFilter('bookings')}
          >
            Bookings ({notifications.filter(n => n.type === 'booking').length})
          </button>
          <button
            className={`filter-btn ${filter === 'services' ? 'active' : ''}`}
            onClick={() => setFilter('services')}
          >
            Services ({notifications.filter(n => n.type === 'service').length})
          </button>
        </div>

        <div className="action-buttons">
          {unreadCount > 0 && (
            <button className="action-btn" onClick={markAllAsRead} title="Mark all as read">
              ✓ Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="action-btn delete-btn" onClick={deleteAllNotifications} title="Delete all">
              🗑️ Clear All
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="notification-card empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Notifications</h3>
            <p>
              {filter === 'unread'
                ? 'All notifications have been read'
                : filter === 'bookings'
                ? 'No booking notifications yet'
                : filter === 'services'
                ? 'No service notifications yet'
                : 'You are all caught up!'}
            </p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
            >
              <div className="notification-icon" style={{ backgroundColor: notification.color }}>
                {notification.icon}
              </div>

              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-type">{notification.type}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="notification-actions">
                {!notification.isRead && (
                  <button
                    className="action-icon"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-icon delete"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bookings Section */}
      <div className="bookings-section">
        <h2>
          <Icon name="calendar" size={24} /> Your Active Bookings
        </h2>

        {bookingNotifications.length === 0 ? (
          <div className="notification-card">
            <p className="muted" style={{ textAlign: 'center' }}>
              No active bookings. <button onClick={() => navigate('/search')} className="link-btn">Search rooms</button>
            </p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookingNotifications.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.roomName || 'Room Booking'}</h4>
                  <span className="booking-status">
                    {new Date(booking.checkOut) > new Date() ? '✓ Active' : '✓ Completed'}
                  </span>
                </div>
                <div className="booking-details">
                  <div className="detail">
                    <span className="label">Check-in</span>
                    <span className="value">{booking.checkIn}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Check-out</span>
                    <span className="value">{booking.checkOut}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Guests</span>
                    <span className="value">{booking.guests || 1}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Total</span>
                    <span className="value price">${booking.totalPrice || 0}</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/bookings')}>
                  View Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Services Info */}
      <div className="services-section">
        <h2>
          <Icon name="settings" size={24} /> Notification Services
        </h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">📧</div>
            <h4>Email Notifications</h4>
            <p>Get booking confirmations and updates via email</p>
            <button className="btn btn-secondary btn-sm">Configure</button>
          </div>
          <div className="service-card">
            <div className="service-icon">💬</div>
            <h4>SMS Alerts</h4>
            <p>Receive important updates via SMS messages</p>
            <button className="btn btn-secondary btn-sm">Configure</button>
          </div>
          <div className="service-card">
            <div className="service-icon">🔔</div>
            <h4>Push Notifications</h4>
            <p>Get real-time notifications in your browser</p>
            <button className="btn btn-secondary btn-sm">Configure</button>
          </div>
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h4>Mobile App</h4>
            <p>Download our app for better notifications</p>
            <button className="btn btn-secondary btn-sm">Learn More</button>
          </div>
        </div>
      </div>

      {/* Back to Dashboard */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Notifications;
