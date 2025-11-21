import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';
import useAuth from '../../hooks/useAuth';
import Icon from './Icon';

const THEME_KEY = 'hrs_theme';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu-wrapper')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar card">
      <div className="nav-left">
        <NavLink to="/" className="brand"><Icon name="plus" size={18} /> HotelSys</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/search" className={({isActive}) => isActive ? 'active' : ''}><Icon name="search" size={16} /> Search</NavLink>
        <NavLink to="/booking-history">Bookings</NavLink>
        {user && user.email === 'admin@hotel.local' && (
          <NavLink to="/admin">Admin</NavLink>
        )}
      </div>
      <div className="nav-actions">
        <button className="btn btn-outline" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Icon name="sun" size={16} /> : <Icon name="moon" size={16} />} 
        </button>
        {user ? (
          <div className="user-menu-wrapper">
            <button 
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title="User menu"
            >
              <Icon name="user" size={18} />
              <span className="user-name">{user.firstName || user.email}</span>
              <Icon name="chevron-down" size={14} />
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown-menu">
                <div className="menu-header">
                  <div className="user-avatar">
                    <Icon name="user" size={24} />
                  </div>
                  <div className="user-info">
                    <p className="user-email">{user.email}</p>
                    <p className="user-member">Member Account</p>
                  </div>
                </div>
                
                <div className="menu-divider"></div>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateTo('/dashboard')}
                >
                  <Icon name="home" size={16} />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateTo('/profile')}
                >
                  <Icon name="user" size={16} />
                  <span>My Profile</span>
                </button>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateTo('/bookings')}
                >
                  <Icon name="calendar" size={16} />
                  <span>My Bookings</span>
                </button>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateTo('/notifications')}
                >
                  <Icon name="bell" size={16} />
                  <span>Notifications</span>
                </button>
                
                <div className="menu-divider"></div>
                
                <button 
                  className="menu-item"
                  onClick={handleLogout}
                >
                  <Icon name="logout" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-auth-group">
            <NavLink to="/login" className="btn btn-secondary">Login</NavLink>
            <NavLink to="/register" className="btn btn-primary">Register</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
