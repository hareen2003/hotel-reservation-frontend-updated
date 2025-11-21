import React, { useState, useMemo, useEffect } from 'react';
import '../../styles/Profile.css';
import useAuth from '../../hooks/useAuth';
import ReservationContext from '../../context/ReservationContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { reservations } = useContext(ReservationContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const myReservations = useMemo(() => (user ? reservations.filter(r => r.userId === user.id) : []), [reservations, user]);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    zipCode: user?.zipCode || '',
    avatar: user?.avatar || '👤',
    joinDate: user?.joinDate || new Date().toISOString(),
    totalBookings: myReservations.length,
    memberStatus: myReservations.length >= 5 ? 'Gold' : myReservations.length >= 2 ? 'Silver' : 'Regular'
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        zipCode: user.zipCode || '',
        totalBookings: myReservations.length,
        memberStatus: myReservations.length >= 5 ? 'Gold' : myReservations.length >= 2 ? 'Silver' : 'Regular'
      }));
    }
  }, [user, myReservations.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = { 
      ...user, 
      name: formData.name, 
      email: formData.email, 
      phone: formData.phone, 
      address: formData.address,
      city: formData.city,
      country: formData.country,
      zipCode: formData.zipCode
    };
    setUser(updated);
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="profile-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="muted">Please log in to view your profile</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="subtitle">Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        {/* Avatar & Basic Info Card */}
        <div className="profile-card avatar-card">
          <div className="avatar-section">
            <div className="avatar-large">{profile.avatar}</div>
            <h2>{profile.name}</h2>
            <p className="member-badge">{profile.memberStatus} Member</p>
          </div>
          <div className="basic-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{profile.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{profile.phone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">{new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Bookings</span>
              <span className="info-value">{profile.totalBookings}</span>
            </div>
          </div>
        </div>

        {/* Edit Form Card */}
        {isEditing ? (
          <div className="profile-card edit-form-card">
            <h3>Edit Profile Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your city"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your street address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your country"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your ZIP code"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>💾 Save Changes</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-actions">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              ✎ Edit Profile
            </button>
            <button className="btn btn-secondary">🔐 Change Password</button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <p className="stat-label">Upcoming Stays</p>
              <p className="stat-value">{myReservations.filter(r => new Date(r.checkIn) > new Date()).length}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <p className="stat-label">Completed Stays</p>
              <p className="stat-value">{myReservations.filter(r => new Date(r.checkOut) < new Date()).length}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Total Spent</p>
              <p className="stat-value">${myReservations.reduce((sum, r) => sum + (r.totalPrice || 0), 0)}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="profile-card">
          <h3>Quick Links</h3>
          <div className="quick-links">
            <button className="quick-link-btn" onClick={() => navigate('/bookings')}>
              <div className="link-icon">📅</div>
              <div className="link-content">
                <h4>Booking History</h4>
                <p>View all your past and upcoming reservations</p>
              </div>
            </button>
            <button className="quick-link-btn" onClick={() => navigate('/search')}>
              <div className="link-icon">🔍</div>
              <div className="link-content">
                <h4>Search Rooms</h4>
                <p>Browse and reserve new rooms</p>
              </div>
            </button>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="profile-card">
          <h3>Account Preferences</h3>
          <div className="preference-item">
            <div className="preference-info">
              <h4>Email Notifications</h4>
              <p>Receive booking confirmations and offers via email</p>
            </div>
            <input type="checkbox" className="checkbox-toggle" defaultChecked />
          </div>
          <div className="preference-item">
            <div className="preference-info">
              <h4>SMS Notifications</h4>
              <p>Get booking reminders and updates via SMS</p>
            </div>
            <input type="checkbox" className="checkbox-toggle" />
          </div>
          <div className="preference-item">
            <div className="preference-info">
              <h4>Newsletter</h4>
              <p>Subscribe to our special offers and deals</p>
            </div>
            <input type="checkbox" className="checkbox-toggle" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
