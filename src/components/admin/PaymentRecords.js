import React, { useState } from 'react';
import '../../styles/PaymentRecords.css';

const PaymentRecords = () => {
  const [payments, setPayments] = useState([
    {
      id: 'PAY-001',
      date: new Date(Date.now() - 3600000),
      guest: 'John Doe',
      amount: 350.00,
      method: 'Credit Card',
      status: 'Completed',
      reservation: 'RES-2024-001',
      room: '201'
    },
    {
      id: 'PAY-002',
      date: new Date(Date.now() - 86400000),
      guest: 'Jane Smith',
      amount: 500.00,
      method: 'Debit Card',
      status: 'Completed',
      reservation: 'RES-2024-002',
      room: '305'
    },
    {
      id: 'PAY-003',
      date: new Date(Date.now() - 172800000),
      guest: 'Michael Brown',
      amount: 275.50,
      method: 'PayPal',
      status: 'Pending',
      reservation: 'RES-2024-003',
      room: '102'
    },
    {
      id: 'PAY-004',
      date: new Date(Date.now() - 259200000),
      guest: 'Sarah Johnson',
      amount: 425.00,
      method: 'Credit Card',
      status: 'Completed',
      reservation: 'RES-2024-004',
      room: '401'
    },
    {
      id: 'PAY-005',
      date: new Date(Date.now() - 345600000),
      guest: 'Robert Wilson',
      amount: 300.00,
      method: 'Bank Transfer',
      status: 'Failed',
      reservation: 'RES-2024-005',
      room: '203'
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filter === 'all' || payment.status.toLowerCase() === filter;
    const matchesSearch = payment.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const completedCount = payments.filter(p => p.status === 'Completed').length;
  const pendingCount = payments.filter(p => p.status === 'Pending').length;

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'status-completed',
      'Pending': 'status-pending',
      'Failed': 'status-failed',
    };
    return colors[status] || '';
  };

  const getMethodIcon = (method) => {
    const icons = {
      'Credit Card': '💳',
      'Debit Card': '💳',
      'PayPal': '🅿️',
      'Bank Transfer': '🏦',
    };
    return icons[method] || '💰';
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleDownloadReceipt = (payment) => {
    alert(`Downloading receipt for ${payment.id}`);
  };

  return (
    <div className="payment-records-container">
      <div className="records-header">
        <h1>Payment Records</h1>
        <p className="subtitle">Manage and track all payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-content">
            <h4>Total Revenue</h4>
            <p className="stat-value">${totalRevenue.toFixed(2)}</p>
            <span className="stat-label">Completed payments</span>
          </div>
          <div className="stat-icon">💰</div>
        </div>
        <div className="stat-card green">
          <div className="stat-content">
            <h4>Completed</h4>
            <p className="stat-value">{completedCount}</p>
            <span className="stat-label">Successful transactions</span>
          </div>
          <div className="stat-icon">✓</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-content">
            <h4>Pending</h4>
            <p className="stat-value">{pendingCount}</p>
            <span className="stat-label">Awaiting confirmation</span>
          </div>
          <div className="stat-icon">⏳</div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by guest name or payment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Payments
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
        </div>
      </div>

      {/* Payments Table - Desktop */}
      <div className="table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td className="id-cell">{payment.id}</td>
                <td>{payment.date.toLocaleDateString()}</td>
                <td>{payment.guest}</td>
                <td>{payment.room}</td>
                <td className="amount-cell">${payment.amount.toFixed(2)}</td>
                <td>
                  <span className="method-badge">
                    {getMethodIcon(payment.method)} {payment.method}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View Details" onClick={() => handleViewPayment(payment)}>👁️</button>
                    <button className="btn-icon" title="Download Receipt" onClick={() => handleDownloadReceipt(payment)}>📥</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments Cards - Mobile */}
      <div className="payments-cards">
        {filteredPayments.map(payment => (
          <div key={payment.id} className="payment-card">
            <div className="card-header">
              <div>
                <h4>{payment.guest}</h4>
                <p className="card-id">{payment.id}</p>
              </div>
              <span className={`status-badge ${getStatusColor(payment.status)}`}>
                {payment.status}
              </span>
            </div>
            <div className="card-details">
              <div className="detail-item">
                <span>Date</span>
                <strong>{payment.date.toLocaleDateString()}</strong>
              </div>
              <div className="detail-item">
                <span>Room</span>
                <strong>{payment.room}</strong>
              </div>
              <div className="detail-item">
                <span>Amount</span>
                <strong className="amount">${payment.amount.toFixed(2)}</strong>
              </div>
              <div className="detail-item">
                <span>Method</span>
                <strong>{getMethodIcon(payment.method)} {payment.method}</strong>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => handleViewPayment(payment)}>View Details</button>
              <button className="btn btn-sm btn-secondary" onClick={() => handleDownloadReceipt(payment)}>Download</button>
            </div>
          </div>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="empty-state">
          <p>No payments found matching your search criteria.</p>
        </div>
      )}

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Details</h2>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-group">
                  <label>Payment ID</label>
                  <p>{selectedPayment.id}</p>
                </div>
                <div className="detail-group">
                  <label>Guest Name</label>
                  <p>{selectedPayment.guest}</p>
                </div>
                <div className="detail-group">
                  <label>Room Number</label>
                  <p>{selectedPayment.room}</p>
                </div>
                <div className="detail-group">
                  <label>Reservation ID</label>
                  <p>{selectedPayment.reservation}</p>
                </div>
                <div className="detail-group">
                  <label>Date</label>
                  <p>{selectedPayment.date.toLocaleDateString()} {selectedPayment.date.toLocaleTimeString()}</p>
                </div>
                <div className="detail-group">
                  <label>Payment Method</label>
                  <p>{getMethodIcon(selectedPayment.method)} {selectedPayment.method}</p>
                </div>
                <div className="detail-group">
                  <label>Amount</label>
                  <p className="amount-highlight">${selectedPayment.amount.toFixed(2)}</p>
                </div>
                <div className="detail-group">
                  <label>Status</label>
                  <p>
                    <span className={`status-badge ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="transaction-summary">
                <h3>Transaction Summary</h3>
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <strong>${(selectedPayment.amount * 0.9).toFixed(2)}</strong>
                </div>
                <div className="summary-item">
                  <span>Tax (10%):</span>
                  <strong>${(selectedPayment.amount * 0.1).toFixed(2)}</strong>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <strong>${selectedPayment.amount.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleDownloadReceipt(selectedPayment)}>
                📥 Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRecords;
