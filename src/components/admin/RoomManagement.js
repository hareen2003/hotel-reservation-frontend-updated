import React, { useState, useContext, useEffect } from "react";
import "../../styles/RoomManagement.css";
import useRooms from "../../hooks/useRooms";
import Icon from "../common/Icon";

const RoomManagement = () => {
  const { rooms, loading, error } = useRooms();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="page-container">
      {/* HERO */}
      <div className="admin-hero card" aria-hidden>
        <div className="hero-content">
          <h1>Room Management</h1>
          <p className="muted">
            View all available rooms. Create, edit, and delete rooms via the backend API.
          </p>
          <p className="warning-note" style={{ marginTop: 12, color: '#ff9800', fontSize: 14 }}>
            ⓘ Room management is handled by the backend API.
          </p>
        </div>
        <div className="hero-illustration">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
            alt="rooms"
          />
        </div>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="alert alert-error" style={{ marginTop: 16 }}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="alert alert-info" style={{ marginTop: 16 }}>
          <p>⏳ Loading rooms...</p>
        </div>
      )}

      {/* ROOMS GRID */}
      <div className="grid room-grid" style={{ marginTop: 16 }}>
        {rooms && rooms.length > 0 ? (
          rooms.map((r) => (
            <div key={r.id} className="room-item">
              {/* IMAGE */}
              <div className="room-image">
                <img src={r.image} alt={r.name} />
                <span className="badge badge-soft">
                  {r.availability || "Available"}
                </span>
              </div>

              {/* BODY */}
              <div className="room-body">
                <div className="room-title">
                  <h3>{r.name}</h3>
                  <div className="meta">
                    <span className="badge badge-info">{r.type}</span>
                    <strong style={{ marginLeft: 8 }}>
                      ${r.price?.toLocaleString?.() || r.price}
                    </strong>
                  </div>
                </div>
                <p className="muted" style={{ margin: "6px 0 0" }}>
                  {r.beds} beds • Sleeps {r.guests}
                </p>
              </div>

              {/* VIEW ONLY */}
              <div className="room-actions">
                <button className="btn ghost" title="View">
                  <Icon name="eye" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 20 }}>
            <p className="muted">No rooms available</p>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {!loading && (!rooms || rooms.length === 0) && !error && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p className="muted">🏨 No rooms found. Please connect to the backend API.</p>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
