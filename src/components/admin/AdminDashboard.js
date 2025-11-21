import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import RoomContext from '../../context/RoomContext';
import ReservationContext from '../../context/ReservationContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { rooms } = useContext(RoomContext);
  const { reservations } = useContext(ReservationContext);

  const totalRooms = rooms.length;
  const totalReservations = reservations.length;

  const adminPages = [
    {
      id: 'profile',
      title: 'My Profile',
      description: 'Manage your account and preferences',
      icon: '👤',
      path: '/admin/profile',
      color: 'gradient-purple'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'View and manage all users',
      icon: '👥',
      path: '/admin/users',
      color: 'gradient-blue'
    },
    {
      id: 'rooms',
      title: 'Room Management',
      description: 'Manage rooms and pricing',
      icon: '🏨',
      path: '/admin/rooms',
      color: 'gradient-green'
    },
    {
      id: 'reservations',
      title: 'Reservations',
      description: 'Manage all reservations',
      icon: '📅',
      path: '/admin/reservations',
      color: 'gradient-orange'
    },
    {
      id: 'payments',
      title: 'Payment Records',
      description: 'Track payment transactions',
      icon: '💳',
      path: '/admin/payments',
      color: 'gradient-cyan'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage notification preferences',
      icon: '🔔',
      path: '/admin/notifications',
      color: 'gradient-red'
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">Central overview of all reservations and rooms</p>
      </header>

      <section className="dashboard-stats">
        <div className="dashboard-card accent-blue">
          <div className="card-icon">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          <div>
            <h3>Rooms</h3>
            <p className="card-value">{totalRooms}</p>
            <p className="card-desc">Total rooms listed</p>
          </div>
        </div>
        <div className="dashboard-card accent-purple">
          <div className="card-icon">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 3v4M8 3v4M2 11h20"/>
            </svg>
          </div>
          <div>
            <h3>Reservations</h3>
            <p className="card-value">{totalReservations}</p>
            <p className="card-desc">Active reservations</p>
          </div>
        </div>
      </section>

      {/* Admin Pages Navigation */}
      <section className="admin-pages-section">
        <h2>Admin Tools</h2>
        <div className="admin-pages-grid">
          {adminPages.map(page => (
            <div
              key={page.id}
              className={`admin-nav-card ${page.color}`}
              onClick={() => navigate(page.path)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && navigate(page.path)}
            >
              <div className="nav-icon">{page.icon}</div>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <span className="nav-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Card */}
      <section className="dashboard-welcome-card">
        <h2>Welcome, Admin!</h2>
        <p>Use the admin tools above to manage rooms, users, reservations, payments, and notifications. This dashboard gives you an at-a-glance summary of key metrics.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
