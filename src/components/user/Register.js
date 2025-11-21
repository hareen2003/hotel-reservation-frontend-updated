import React, { useState } from 'react';
import '../../styles/Register.css';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Icon from '../common/Icon';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ firstName, lastName, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container card">
        <div className="register-header">
          <Icon name="plus" size={48} />
          <h1>Create Account</h1>
          <p className="muted">Join us and start booking amazing rooms</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label><Icon name="user" size={16} style={{marginRight: 6}} /> First Name</label>
              <input 
                type="text"
                placeholder="John"
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label><Icon name="user" size={16} style={{marginRight: 6}} /> Last Name</label>
              <input 
                type="text"
                placeholder="Doe"
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label><Icon name="user" size={16} style={{marginRight: 6}} /> Email Address</label>
            <input 
              type="email"
              placeholder="your@email.com"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label><Icon name="eye" size={16} style={{marginRight: 6}} /> Password</label>
            <input 
              type="password" 
              placeholder="Create a strong password"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          <button className="btn btn-primary btn-large" type="submit">
            <Icon name="plus" /> Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
