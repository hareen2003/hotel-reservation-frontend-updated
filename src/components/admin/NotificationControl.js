import React, { useState } from 'react';
import '../../styles/NotificationControl.css';

const NotificationControl = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', title: 'New Reservation', message: 'Room 201 booked by John Doe', timestamp: new Date(Date.now() - 300000), read: false },
    { id: 2, type: 'payment', title: 'Payment Received', message: '$250 received from Jane Smith', timestamp: new Date(Date.now() - 600000), read: false },
    { id: 3, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance tonight at 2 AM', timestamp: new Date(Date.now() - 3600000), read: true },
    { id: 4, type: 'booking', title: 'Cancellation Request', message: 'Reservation #12345 cancelled by guest', timestamp: new Date(Date.now() - 86400000), read: true },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    systemAlerts: false,
    weeklyReport: true,
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      booking: '📅',
      payment: '💳',
      system: '⚙️',
      user: '👤',
    };
    return icons[type] || '🔔';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-control-container">
      <div className="control-header">
        <h1>Notification Center</h1>
        <p className="subtitle">Manage your notifications and preferences</p>
      </div>

      <div className="control-content">
        {/* Notifications Section */}
        <div className="section">
          <div className="section-header">
            <h2>Recent Notifications</h2>
            {unreadCount > 0 && (
              <button className="btn btn-sm btn-secondary" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>

          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                  <div className="notif-icon">{getNotificationIcon(notif.type)}</div>
                  <div className="notif-content">
                    <h4>{notif.title}</h4>
                    <p>{notif.message}</p>
                    <span className="notif-time">
                      {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="notif-actions">
                    {!notif.read && (
                      <button
                        className="btn-icon"
                        onClick={() => markAsRead(notif.id)}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      className="btn-icon delete"
                      onClick={() => deleteNotification(notif.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No notifications</p>
            )}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="section">
          <h2>Notification Preferences</h2>
          <div className="preferences-grid">
            <div className="preference-card">
              <div className="pref-header">
                <h3>Email Notifications</h3>
              </div>
              <p>Receive notifications via email</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => togglePreference('emailNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-card">
              <div className="pref-header">
                <h3>Push Notifications</h3>
              </div>
              <p>Receive browser push notifications</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications}
                  onChange={() => togglePreference('pushNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-card">
              <div className="pref-header">
                <h3>Booking Alerts</h3>
              </div>
              <p>Alerts for new bookings and cancellations</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.bookingAlerts}
                  onChange={() => togglePreference('bookingAlerts')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-card">
              <div className="pref-header">
                <h3>Payment Alerts</h3>
              </div>
              <p>Alerts for payment transactions</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.paymentAlerts}
                  onChange={() => togglePreference('paymentAlerts')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-card">
              <div className="pref-header">
                <h3>System Alerts</h3>
              </div>
              <p>Maintenance and system updates</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.systemAlerts}
                  onChange={() => togglePreference('systemAlerts')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-card">
              <div className="pref-header">
                <h3>Weekly Report</h3>
              </div>
              <p>Receive weekly summary report</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.weeklyReport}
                  onChange={() => togglePreference('weeklyReport')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="section">
          <h2>Notification Channels</h2>
          <div className="channels-grid">
            <div className="channel-card">
              <span className="channel-icon">📧</span>
              <h4>Email</h4>
              <p>admin@hotel.com</p>
              <button className="btn btn-sm btn-secondary">Update</button>
            </div>
            <div className="channel-card">
              <span className="channel-icon">📱</span>
              <h4>SMS</h4>
              <p>+1 (555) 123-4567</p>
              <button className="btn btn-sm btn-secondary">Update</button>
            </div>
            <div className="channel-card">
              <span className="channel-icon">🔔</span>
              <h4>In-App</h4>
              <p>Always enabled</p>
              <span className="status-badge active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationControl;
