import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Premium car rental services at your fingertips. Choose from our wide range of vehicles.</p>
          <div className="hero-buttons">
            <Link to="/fleet" className="btn btn-primary">Browse Fleet</Link>
            <Link to="/services" className="btn btn-secondary">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Wide Selection</h3>
              <p>Choose from economy to luxury vehicles that suit your needs and budget.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive rates with no hidden charges. Transparent pricing guaranteed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer service to assist you whenever you need.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Easy Booking</h3>
              <p>Simple and quick booking process. Get your car in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="featured-cars">
        <div className="container">
          <h2>Featured Vehicles</h2>
          <p className="section-subtitle">Explore our most popular rental cars</p>
          <div className="cars-grid">
            {/* Sample car cards - will be dynamic later */}
            <div className="car-card">
              <div className="car-image-placeholder">🚙</div>
              <h3>Toyota Prius</h3>
              <p className="car-type">Hybrid Sedan</p>
              <p className="car-price">LKR 8,500 / day</p>
              <Link to="/fleet" className="btn btn-small">View Details</Link>
            </div>
            <div className="car-card">
              <div className="car-image-placeholder">🚗</div>
              <h3>Honda Fit</h3>
              <p className="car-type">Economy Hatchback</p>
              <p className="car-price">LKR 6,000 / day</p>
              <Link to="/fleet" className="btn btn-small">View Details</Link>
            </div>
            <div className="car-card">
              <div className="car-image-placeholder">🚙</div>
              <h3>Toyota Hilux</h3>
              <p className="car-type">Pickup Truck</p>
              <p className="car-price">LKR 12,000 / day</p>
              <Link to="/fleet" className="btn btn-small">View Details</Link>
            </div>
          </div>
          <div className="view-all">
            <Link to="/fleet" className="btn btn-outline">View All Vehicles</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Hit the Road?</h2>
          <p>Book your perfect car today and enjoy the freedom of the open road</p>
          <Link to="/fleet" className="btn btn-primary btn-large">Book Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;