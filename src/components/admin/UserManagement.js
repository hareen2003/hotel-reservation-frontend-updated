import React, { useState } from "react";
import "../../styles/UserManagement.css";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data will be replaced by backend API calls
  const users = [];
  const filteredUsers = [];
  const activeUsers = 0;
  const totalRevenue = 0;

  const getStatusColor = (status) => {
    return status === "active" ? "status-active" : "status-inactive";
  };

  const getStatusIcon = (status) => {
    return status === "active" ? "🟢" : "⚪";
  };

  const openDetail = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  return (
    <div className="user-management-container">
      <div className="management-header">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">Manage and monitor all registered users</p>
        </div>
        <div className="header-note" style={{ fontSize: 14, color: '#ff9800' }}>
          ⓘ User management is handled by the backend API.
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card stat-users">
          <div className="stat-info">
            <h4>Total Users</h4>
            <p className="stat-number">{users.length}</p>
          </div>
          <div className="stat-icon">👥</div>
        </div>
        <div className="stat-card stat-active">
          <div className="stat-info">
            <h4>Active Users</h4>
            <p className="stat-number">{activeUsers}</p>
          </div>
          <div className="stat-icon">🟢</div>
        </div>
        <div className="stat-card stat-revenue">
          <div className="stat-info">
            <h4>Total Revenue</h4>
            <p className="stat-number">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="stat-icon">💰</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            disabled
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            disabled
          >
            All Users
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
            disabled
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === "inactive" ? "active" : ""}`}
            onClick={() => setFilter("inactive")}
            disabled
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 16, marginBottom: 8 }}>👤 Connecting to backend...</p>
        <p className="muted">User data will appear here once the backend API is connected.</p>
        <p className="muted" style={{ marginTop: 12, fontSize: 12, color: '#ff9800' }}>
          Ensure your Spring Boot backend is running and configured correctly.
        </p>
      </div>
    </div>
  );
};

export default UserManagement;
