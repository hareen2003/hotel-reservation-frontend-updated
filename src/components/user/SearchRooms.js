import React, { useState } from "react";
import "../../styles/SearchRooms.css";
import { useNavigate } from "react-router-dom";
import useRooms from "../../hooks/useRooms";
import Icon from "../common/Icon";

const SearchRooms = () => {
  const [guests, setGuests] = useState(1);
  const [type, setType] = useState("any");
  const [searchText, setSearchText] = useState("");
  const { searchRooms, rooms } = useRooms();
  const [results, setResults] = useState(rooms);
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});

  const filterByText = (list, text) => {
    const q = text.toLowerCase();
    if (!q.trim()) return list;
    return list.filter((room) =>
      room.name.toLowerCase().includes(q) ||
      room.type.toLowerCase().includes(q) ||
      (room.description && room.description.toLowerCase().includes(q))
    );
  };

  const handleSearch = (e) => {
    e && e.preventDefault();
    const base = searchRooms({ guests, type });
    const filtered = filterByText(base, searchText);
    setResults(filtered);
  };

  const handleSearchTextChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    // live text search over all rooms, respecting guests/type as well
    const base = searchRooms({ guests, type });
    const filtered = filterByText(base, text);
    setResults(filtered);
  };

  const handleImageError = (roomId) => {
    setImageErrors((prev) => ({ ...prev, [roomId]: true }));
  };

  return (
    <div className="page-container search-rooms-page">
      {/* HERO */}
      <div className="search-hero card">
        <h1>
          <Icon name="search" size={32} /> Find Your Perfect Room
        </h1>
        <p className="muted">
          Browse our curated selection of premium accommodations
        </p>
      </div>

      {/* SEARCH PANEL */}
      <form onSubmit={handleSearch} className="search-form card">
        <div className="form-group">
          <label>
            <Icon name="search" size={18} style={{ marginRight: 8 }} /> Search
            Rooms
          </label>
          <input
            type="text"
            placeholder="Type room name, type, or description..."
            value={searchText}
            onChange={handleSearchTextChange}
            className="search-input"
          />
        </div>

        <div className="form-group">
          <label>
            <Icon name="users" size={18} style={{ marginRight: 8 }} /> Number of
            Guests
          </label>
          <input
            type="number"
            value={guests}
            min={1}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>
            <Icon name="bed" size={18} style={{ marginRight: 8 }} /> Room Type
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="any">Any Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          style={{ marginTop: "1.5rem", width: "100%" }}
        >
          <Icon name="search" size={20} /> Search Rooms
        </button>
      </form>

      {/* RESULTS HEADER */}
      <div className="results-header">
        <h2>Available Rooms ({results.length})</h2>
        <p className="muted">
          Select a room to view details and make a reservation
        </p>
      </div>

      {/* ROOMS GRID */}
      <div className="rooms-grid">
        {results.map((r) => (
          <div key={r.id} className="room-card card">
            <div className="room-image">
              {!imageErrors[r.id] ? (
                <img
                  src={r.image}
                  alt={r.name}
                  onError={() => handleImageError(r.id)}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(96, 165, 250, 0.15))",
                    fontSize: "3rem"
                  }}
                >
                  🏨
                </div>
              )}
              <span className="room-type-badge">{r.type}</span>
            </div>

            <div className="room-details">
              <h3>{r.name}</h3>

              <div className="room-meta">
                <span>
                  <Icon name="bed" size={16} /> {r.beds} beds
                </span>
                <span>
                  <Icon name="user" size={16} /> {r.guests} guests
                </span>
              </div>

              <div className="room-price">
                <strong>${r.price}</strong>
                <span>/night</span>
              </div>

              <div className="room-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/reserve/${r.id}`)}
                >
                  <Icon name="plus" /> Reserve
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate(`/rooms/${r.id}`)}
                >
                  <Icon name="eye" /> Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {results.length === 0 && (
        <div className="card empty-results">
          <p>No rooms match your criteria. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchRooms;
