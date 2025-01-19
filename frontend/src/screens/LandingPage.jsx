import React from 'react';
import { Link } from 'react-router-dom'; // Ensure React Router is installed
import NavDropdown from 'react-bootstrap/NavDropdown'; // Ensure React-Bootstrap is installed
import './LandingPage.css'; // Custom styles for the landing page

const LandingPage = ({ userInfo }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Home with Gidalo</h1>
          <p>Connecting you to the best properties across Nigeria and beyond.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Properties</button>
            {userInfo?.isAgent ? (
              <NavDropdown title="Agent" id="agentmenu" className="btn-secondary">
                <Link to="/agent/propertylist" className="dropdown-item">
                  List of Properties
                </Link>
              </NavDropdown>
            ) : (
              <button className="btn-secondary">List Your Property</button>
            )}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="search-bar">
        <input type="text" placeholder="Location" />
        <select>
          <option>Property Type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Land</option>
        </select>
        <input type="number" placeholder="Max Price" />
        <button className="btn-primary">Search Now</button>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="properties-grid">
          <div className="property-card">
            <img
              src="https://storage.googleapis.com/gidalo_bucket/00f33abe-3411-4377-9f58-9bdfc422c0ae-alex%26bill_internal3.jpeg"
              alt="Property"
            />
            <h3>Luxury Apartment</h3>
            <p>Lagos, Nigeria</p>
            <p>$250,000</p>
          </div>
          {/* Add more property cards */}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Search for Properties</h3>
            <p>Find the perfect property that meets your needs.</p>
          </div>
          <div className="step">
            <h3>2. Schedule a Visit</h3>
            <p>Visit the property to ensure it’s the right fit for you.</p>
          </div>
          <div className="step">
            <h3>3. Secure Your Dream Home</h3>
            <p>Complete the process and move into your dream home.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-carousel">
          <blockquote>
            "Gidalo made finding my dream home so easy. Highly recommend!"
          </blockquote>
          <p>- Jotham Aleoke-Malachi</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQs</a>
        </div>
        <div className="footer-social">
          <p>Follow us:</p>
          <i className="icon-facebook"></i>
          <i className="icon-twitter"></i>
          <i className="icon-instagram"></i>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
