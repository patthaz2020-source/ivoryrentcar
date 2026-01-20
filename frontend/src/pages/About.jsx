import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About RentACar</h1>
          <p>Your trusted partner in car rental services since 2010</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>Founded in 2010, RentACar has been serving the community of Maharagama and beyond with premium car rental services. What started as a small family business with just 5 vehicles has grown into a trusted name with a fleet of over 50 well-maintained cars.</p>
              <p>We pride ourselves on providing exceptional customer service, competitive prices, and a diverse range of vehicles to meet every need - from daily commutes to special occasions.</p>
              <p>Our commitment to quality and customer satisfaction has made us the preferred choice for thousands of customers across Western Province.</p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">🏢</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>To provide reliable, affordable, and high-quality car rental services that exceed customer expectations while maintaining the highest standards of safety and professionalism.</p>
            </div>
            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>To be the leading car rental service in Sri Lanka, recognized for innovation, sustainability, and unparalleled customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Trust & Integrity</h4>
              <p>We build lasting relationships through honest and transparent business practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h4>Excellence</h4>
              <p>We strive for excellence in every aspect of our service delivery.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h4>Sustainability</h4>
              <p>We're committed to eco-friendly practices and maintaining a green fleet.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h4>Customer First</h4>
              <p>Your satisfaction and safety are our top priorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>15+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Vehicles Available</p>
            </div>
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;