import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>RentACar</h2>
        </Link>

        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about')}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/services" 
              className={`nav-link ${isActive('/services')}`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/fleet" 
              className={`nav-link ${isActive('/fleet')}`}
              onClick={() => setIsOpen(false)}
            >
              Our Fleet
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/book" className="btn btn-primary">Book Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;