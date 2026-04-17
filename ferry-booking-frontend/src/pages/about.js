import React from 'react';
import '../styles/main.css';

const About = () => {
  return (
    <div className="page-container">
      {/* Hero Section with authentic image */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/images/about-us/about-banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '400px'
      }}>
        <div className="hero-content">
          <h1 className="hero-title">About Payfikar Travels</h1>
          <p className="hero-subtitle">Your trusted partner for seamless maritime travel</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Who We Are</h2>
              <p className="lead">Payfikar Travels is a leading maritime transportation company dedicated to providing safe, reliable, and comfortable ferry services connecting Mumbai with its coastal destinations.</p>
              <p>With years of experience in the maritime industry, we have established ourselves as the preferred choice for travelers seeking convenient and affordable sea transportation between Mumbai and Mandwa/Alibaug.</p>
              
              <div className="stats mt-4">
                <div className="row">
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">10+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">500K+</div>
                    <div className="stat-label">Passengers Served</div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">15+</div>
                    <div className="stat-label">Modern Vessels</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/images/about-us/Images1.png" alt="Payfikar Travels" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="mission-card p-4 bg-white rounded shadow">
                <h3 className="text-primary mb-3">
                  <i className="fas fa-bullseye me-2"></i>Our Mission
                </h3>
                <p>To provide safe, reliable, and comfortable ferry services that connect communities and enhance travel experiences while maintaining the highest standards of maritime safety and customer satisfaction.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="vision-card p-4 bg-white rounded shadow">
                <h3 className="text-primary mb-3">
                  <i className="fas fa-eye me-2"></i>Our Vision
                </h3>
                <p>To become the leading ferry service provider in the region, recognized for excellence in maritime transportation, innovation in customer service, and commitment to sustainable practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Services</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="service-card text-center p-4">
                <div className="service-icon mb-3">
                  <img src="/assets/images/about-us/CarImages.png" alt="Vehicle Transport" className="img-fluid" style={{height: '60px'}} />
                </div>
                <h4>Vehicle Transport</h4>
                <p>Safe and secure transportation for cars, bikes, and other vehicles with dedicated vehicle decks.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="service-card text-center p-4">
                <div className="service-icon mb-3">
                  <img src="/assets/images/about-us/Promter.png" alt="Passenger Service" className="img-fluid" style={{height: '60px'}} />
                </div>
                <h4>Passenger Service</h4>
                <p>Comfortable seating arrangements, refreshments, and entertainment for a pleasant journey experience.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="service-card text-center p-4">
                <div className="service-icon mb-3">
                  <img src="/assets/images/about-us/WheelChair.png" alt="Accessibility" className="img-fluid" style={{height: '60px'}} />
                </div>
                <h4>Accessibility</h4>
                <p>Wheelchair accessible facilities and special assistance for passengers with mobility needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="fleet-showcase bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Modern Fleet</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="fleet-item">
                <img src="/assets/images/fleet/ferry-1.jpg" alt="Modern Ferry" className="img-fluid rounded shadow" />
                <div className="fleet-info p-3">
                  <h4>High-Speed Catamarans</h4>
                  <p>Modern, fuel-efficient vessels designed for comfort and speed.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="fleet-item">
                <img src="/assets/images/fleet/ferry-2.jpg" alt="Luxury Ferry" className="img-fluid rounded shadow" />
                <div className="fleet-info p-3">
                  <h4>Luxury Passenger Vessels</h4>
                  <p>Spacious interiors with premium amenities for your comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Achievements</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4 text-center">
              <img src="/assets/images/about-us/NewAchivement.png" alt="Achievement" className="img-fluid mb-3" style={{height: '100px'}} />
              <h5>Safety Excellence Award</h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <img src="/assets/images/about-us/GrowthMandwa.png" alt="Growth" className="img-fluid mb-3" style={{height: '100px'}} />
              <h5>Regional Growth Leader</h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <img src="/assets/images/about-us/OverPeople.png" alt="Customers" className="img-fluid mb-3" style={{height: '100px'}} />
              <h5>Customer Satisfaction</h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <img src="/assets/images/about-us/Year.png" alt="Experience" className="img-fluid mb-3" style={{height: '100px'}} />
              <h5>Years of Excellence</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
