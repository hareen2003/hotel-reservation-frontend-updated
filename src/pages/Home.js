import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Icon from '../components/common/Icon';

const Home = () => {
  const navigate = useNavigate();
  const [activeAmenity, setActiveAmenity] = useState('wellness');

  const amenities = {
    wellness: {
      title: 'Wellness & Spa',
      items: ['Premium Spa Services', 'Fitness Center', 'Yoga Studio', 'Sauna & Steam Room'],
      icon: 'heart'
    },
    dining: {
      title: 'Dining Experience',
      items: ['Fine Dining Restaurant', 'Rooftop Bar', '24/7 Room Service', 'Private Chef'],
      icon: 'utensils'
    },
    business: {
      title: 'Business Facilities',
      items: ['Conference Rooms', 'High-Speed WiFi', 'Business Center', 'Meeting Spaces'],
      icon: 'briefcase'
    },
    recreation: {
      title: 'Recreation',
      items: ['Swimming Pool', 'Game Room', 'Private Beach', 'Outdoor Activities'],
      icon: 'sun'
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Background */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Perfect Stay</h1>
          <p className="hero-subtitle">
            Find, book, and manage luxury accommodations worldwide. Fast, secure, and hassle-free.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/search')}>
              <Icon name="search" size={20} /> Search Rooms
            </button>
            <button className="btn btn-outline btn-large" onClick={() => navigate('/register')}>
              <Icon name="plus" size={20} /> Get Started
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>Experience luxury and comfort like never before</p>
        </div>
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">
              <Icon name="location" size={32} />
            </div>
            <h3>Prime Locations</h3>
            <p>Curated selection of rooms in the best city destinations.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">
              <Icon name="calendar" size={32} />
            </div>
            <h3>Easy Booking</h3>
            <p>Simple 3-step process to reserve your ideal room instantly.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">
              <Icon name="tag" size={32} />
            </div>
            <h3>Best Prices</h3>
            <p>Competitive rates with transparent pricing, no hidden fees.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">
              <Icon name="bed" size={32} />
            </div>
            <h3>Quality Rooms</h3>
            <p>Premium rooms with modern amenities and excellent service.</p>
          </div>
        </div>
      </div>

      {/* Amenities Section with Tabs */}
      <div className="amenities-section">
        <div className="section-header">
          <h2>World-Class Amenities</h2>
          <p>Everything you need for an unforgettable stay</p>
        </div>
        <div className="amenities-tabs">
          {Object.keys(amenities).map((key) => (
            <button
              key={key}
              className={`amenity-tab ${activeAmenity === key ? 'active' : ''}`}
              onClick={() => setActiveAmenity(key)}
            >
              <Icon name={amenities[key].icon} size={24} />
              <span>{amenities[key].title}</span>
            </button>
          ))}
        </div>
        <div className="amenities-content">
          <div className="amenities-grid">
            {amenities[activeAmenity].items.map((item, index) => (
              <div key={index} className="amenity-item">
                <Icon name="check" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat">
          <h4>500+</h4>
          <p>Rooms Available</p>
        </div>
        <div className="stat">
          <h4>10K+</h4>
          <p>Happy Customers</p>
        </div>
        <div className="stat">
          <h4>24/7</h4>
          <p>Customer Support</p>
        </div>
        <div className="stat">
          <h4>95%</h4>
          <p>Satisfaction Rate</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Room?</h2>
          <p>Join thousands of travelers who trust HotelSys for their accommodation needs.</p>
          <button className="btn btn-primary btn-large" onClick={() => navigate('/search')}>
            <Icon name="search" size={20} /> Start Searching Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
