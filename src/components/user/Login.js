import React, { useState } from 'react';
import '../../styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Icon from '../common/Icon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container card">
        <div className="login-header">
          <Icon name="user" size={48} />
          <h1>Welcome Back</h1>
          <p className="muted">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label><Icon name="user" size={16} style={{marginRight: 6}} /> Email</label>
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
              placeholder="Enter your password"
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
            <Icon name="user" /> Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="link">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
