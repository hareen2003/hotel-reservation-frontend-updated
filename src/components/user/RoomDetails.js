import React from 'react';
import '../../styles/RoomDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import useRooms from '../../hooks/useRooms';
import Icon from '../common/Icon';

const RoomDetails = () => {
  const { id } = useParams();
  const { getRoomById } = useRooms();
  const room = getRoomById(id) || {};
  const navigate = useNavigate();
  const placeholder = 'https://source.unsplash.com/800x600/?hotel,room';

  if (!room.id) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="muted">Room not found</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')} style={{ marginTop: '1rem' }}>
            <Icon name="search" /> Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container room-details-page">
      <button className="btn btn-outline back-btn" onClick={() => navigate('/search')}>
        <Icon name="chevron-down" size={16} style={{transform: 'rotate(90deg)'}} /> Back to Search
      </button>

      <div className="room-details-container">
        {/* Room Image */}
        <div className="room-image-section">
          <img src={room.image || placeholder} alt={room.name || 'Room'} className="room-image" />
          <div className="room-type-badge">{room.type}</div>
        </div>

        {/* Room Info */}
        <div className="room-info-section card">
          <h1>{room.name || 'Room'}</h1>

          <div className="room-meta-info">
            <span><Icon name="bed" size={20} /> {room.beds || 1} beds</span>
            <span><Icon name="users" size={20} /> {room.guests || 2} guests</span>
            <span><Icon name="tag" size={20} /> ${room.price || '—'}/night</span>
          </div>

          <div className="room-price-section">
            <strong className="price">${room.price || '—'}</strong>
            <span>/night</span>
          </div>

          <details className="room-section">
            <summary>
              <span className="summary-title">Description</span>
              <Icon name="chevron-down" size={18} />
            </summary>
            <div className="section-content">
              <p>{room.description || 'A comfortable and spacious room with modern amenities, premium bedding, and a pleasant view. Perfect for business travelers and tourists.'}</p>
            </div>
          </details>

          <details className="room-section" open>
            <summary>
              <span className="summary-title">Amenities</span>
              <Icon name="chevron-down" size={18} />
            </summary>
            <div className="section-content">
              <ul className="amenities-list">
                {(room.amenities || ['Free Wi-Fi', 'Air conditioning', 'Flat-screen TV', 'Mini bar', 'Work desk', 'Marble bathroom']).map((a, i) => (
                  <li key={i}>
                    <Icon name="plus" size={16} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="room-section">
            <summary>
              <span className="summary-title">House Rules</span>
              <Icon name="chevron-down" size={18} />
            </summary>
            <div className="section-content">
              <ul className="rules-list">
                <li>Check-in: 2:00 PM • Check-out: 11:00 AM</li>
                <li>No smoking allowed</li>
                <li>Pets not permitted</li>
                <li>Guests must respect quiet hours after 10:00 PM</li>
              </ul>
            </div>
          </details>

          <div className="room-actions">
            <button className="btn btn-primary btn-large" onClick={() => navigate(`/reserve/${room.id}`)}>
              <Icon name="calendar" size={20} /> Reserve Now
            </button>
            <button className="btn btn-outline btn-large" onClick={() => navigate('/search')}>
              <Icon name="search" size={20} /> View More Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
