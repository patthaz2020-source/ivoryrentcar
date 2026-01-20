import React from 'react';
import '../styles/services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Daily Rentals",
      icon: "📅",
      description: "Rent a car for your daily needs. Perfect for short trips, errands, or quick getaways.",
      features: ["Flexible pickup times", "No minimum rental period", "24-hour support", "Free delivery within city limits"],
      price: "Starting from LKR 5,000/day"
    },
    {
      id: 2,
      title: "Weekly Rentals",
      icon: "📆",
      description: "Extended rental periods with special discounted rates for weekly bookings.",
      features: ["Up to 20% discount", "Unlimited mileage options", "Free vehicle swap", "Priority support"],
      price: "Starting from LKR 30,000/week"
    },
    {
      id: 3,
      title: "Monthly Rentals",
      icon: "🗓️",
      description: "Long-term car rental solutions for business or personal use with the best rates.",
      features: ["Best value pricing", "Free maintenance", "Insurance included", "Flexible contract terms"],
      price: "Starting from LKR 100,000/month"
    },
    {
      id: 4,
      title: "Airport Transfer",
      icon: "✈️",
      description: "Reliable airport pickup and drop-off services. Start your journey stress-free.",
      features: ["Flight tracking", "Meet & greet service", "Luggage assistance", "Available 24/7"],
      price: "Starting from LKR 3,500"
    },
    {
      id: 5,
      title: "Wedding Packages",
      icon: "💒",
      description: "Make your special day memorable with our premium decorated wedding cars.",
      features: ["Luxury vehicle options", "Professional chauffeur", "Decoration included", "Flexible timings"],
      price: "Starting from LKR 25,000"
    },
    {
      id: 6,
      title: "Corporate Solutions",
      icon: "💼",
      description: "Tailored car rental packages for businesses and corporate clients.",
      features: ["Fleet management", "Dedicated account manager", "Invoicing solutions", "Volume discounts"],
      price: "Custom pricing"
    }
  ];

  return (
    <div className="services">
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive car rental solutions tailored to your needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <p className="service-price">{service.price}</p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Choose Your Car</h4>
              <p>Browse our fleet and select the perfect vehicle for your needs.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Book Online</h4>
              <p>Fill out our simple booking form with your details and preferences.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Get Confirmation</h4>
              <p>Receive instant confirmation and prepare your documents.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h4>Pick Up & Drive</h4>
              <p>Collect your car and enjoy your journey with peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="additional-benefits">
        <div className="container">
          <h2>Additional Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">🛡️</span>
              <h4>Full Insurance Coverage</h4>
              <p>All our vehicles come with comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔧</span>
              <h4>Regular Maintenance</h4>
              <p>Our fleet is regularly serviced and maintained to the highest standards.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📱</span>
              <h4>Easy Booking</h4>
              <p>Book online, via phone, or visit our office. Multiple payment options available.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⛽</span>
              <h4>Fuel Flexibility</h4>
              <p>Choose between full-to-full or pre-paid fuel options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;