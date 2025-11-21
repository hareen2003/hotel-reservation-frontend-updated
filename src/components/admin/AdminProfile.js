import React, { useState } from 'react';
import '../../styles/AdminProfile.css';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Anderson',
    email: 'admin@hotel.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Administrator',
    department: 'Management',
    joinDate: '2022-01-15',
    avatar: '👤',
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="admin-profile-container">
      <div className="profile-header">
        <h1>Admin Profile</h1>
        <p className="subtitle">Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        {/* Avatar & Basic Info Card */}
        <div className="profile-card avatar-card">
          <div className="avatar-section">
            <div className="avatar-large">{profile.avatar}</div>
            <h2>{profile.name}</h2>
            <p className="position-badge">{profile.position}</p>
          </div>
          <div className="basic-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{profile.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{profile.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{profile.department}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">{new Date(profile.joinDate).toLocaleDateString()}</span>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
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

        {/* Security & Preferences */}
        <div className="profile-card">
          <h3>Security & Preferences</h3>
          <div className="preference-item">
            <div className="preference-info">
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
            </div>
            <button className="btn btn-secondary">Enable</button>
          </div>
          <div className="preference-item">
            <div className="preference-info">
              <h4>Activity Log</h4>
              <p>View your recent login activities and device information</p>
            </div>
            <button className="btn btn-secondary">View Log</button>
          </div>
          <div className="preference-item">
            <div className="preference-info">
              <h4>API Keys</h4>
              <p>Manage API access tokens for integrations</p>
            </div>
            <button className="btn btn-secondary">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
