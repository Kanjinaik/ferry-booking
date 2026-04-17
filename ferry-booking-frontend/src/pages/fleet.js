import React from 'react';
import '../styles/main.css';

const Fleet = () => {
  const vessels = [
    {
      id: 1,
      name: "Payfikar Express",
      image: "/assets/images/fleet/ferry-1.jpg",
      capacity: "200 Passengers",
      speed: "35 Knots",
      features: ["Air Conditioning", "Cafeteria", "Entertainment", "Vehicle Deck"],
      description: "Our flagship high-speed catamaran offering the fastest and most comfortable journey between Mumbai and Mandwa."
    },
    {
      id: 2,
      name: "Payfikar Princess",
      image: "/assets/images/fleet/ferry-2.jpg",
      capacity: "150 Passengers",
      speed: "28 Knots",
      features: ["Luxury Seating", "Premium Lounge", "WiFi", "Vehicle Deck"],
      description: "Luxury passenger vessel with premium amenities for a comfortable and enjoyable travel experience."
    },
    {
      id: 3,
      name: "Payfikar Swift",
      image: "/assets/images/fleet/ferry-1.jpg",
      capacity: "180 Passengers",
      speed: "32 Knots",
      features: ["Economy Class", "Refreshments", "Entertainment", "Vehicle Deck"],
      description: "Reliable and efficient vessel perfect for regular commuters and budget-conscious travelers."
    },
    {
      id: 4,
      name: "Payfikar Voyager",
      image: "/assets/images/fleet/ferry-2.jpg",
      capacity: "250 Passengers",
      speed: "30 Knots",
      features: ["Spacious Decks", "Multiple Seating", "Cafeteria", "Vehicle Transport"],
      description: "Large capacity vessel ideal for group travel and special events with ample space for all passengers."
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/images/about-us/about-banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '400px'
      }}>
        <div className="hero-content">
          <h1 className="hero-title">Our Fleet</h1>
          <p className="hero-subtitle">Modern vessels for your comfortable journey</p>
        </div>
      </section>

      {/* Fleet Introduction */}
      <section className="fleet-intro py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Modern & Reliable Fleet</h2>
              <p className="lead">Our fleet consists of state-of-the-art vessels designed with passenger comfort, safety, and efficiency in mind.</p>
              <p>Each vessel in our fleet undergoes regular maintenance and safety inspections to ensure the highest standards of maritime safety and reliability.</p>
              
              <div className="fleet-stats mt-4">
                <div className="row">
                  <div className="col-6 mb-3">
                    <div className="stat-item">
                      <h3 className="text-primary">15+</h3>
                      <p className="mb-0">Modern Vessels</p>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="stat-item">
                      <h3 className="text-primary">99.8%</h3>
                      <p className="mb-0">On-time Performance</p>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="stat-item">
                      <h3 className="text-primary">24/7</h3>
                      <p className="mb-0">Safety Monitoring</p>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="stat-item">
                      <h3 className="text-primary">ISO</h3>
                      <p className="mb-0">Certified Standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/images/ferry-1.jpg" alt="Fleet Overview" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Vessel Showcase */}
      <section className="vessels-showcase bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Meet Our Vessels</h2>
          
          <div className="row">
            {vessels.map((vessel) => (
              <div key={vessel.id} className="col-lg-6 mb-4">
                <div className="vessel-card bg-white rounded shadow h-100">
                  <img src={vessel.image} alt={vessel.name} className="card-img-top" style={{height: '250px', objectFit: 'cover'}} />
                  <div className="card-body p-4">
                    <h3 className="card-title text-primary">{vessel.name}</h3>
                    <p className="card-text">{vessel.description}</p>
                    
                    <div className="vessel-specs mb-3">
                      <div className="row">
                        <div className="col-6">
                          <strong>Capacity:</strong> {vessel.capacity}
                        </div>
                        <div className="col-6">
                          <strong>Speed:</strong> {vessel.speed}
                        </div>
                      </div>
                    </div>
                    
                    <div className="vessel-features">
                      <strong>Features:</strong>
                      <ul className="list-unstyled mt-2">
                        {vessel.features.map((feature, index) => (
                          <li key={index} className="mb-1">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Comfort */}
      <section className="safety-comfort py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Safety & Comfort Features</h2>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-shield-alt fa-3x text-primary"></i>
                </div>
                <h4>Advanced Safety Systems</h4>
                <p>Modern navigation equipment, emergency systems, and 24/7 monitoring for passenger safety.</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-ship fa-3x text-primary"></i>
                </div>
                <h4>Comfortable Design</h4>
                <p>Ergonomic seating, climate control, and spacious layouts for a pleasant journey experience.</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-bolt fa-3x text-primary"></i>
                </div>
                <h4>Modern Technology</h4>
                <p>Advanced propulsion systems, GPS navigation, and communication equipment for reliable service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance & Standards */}
      <section className="maintenance bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/assets/images/ferry-2.jpg" alt="Maintenance" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">Rigorous Maintenance Standards</h2>
              <p>Our vessels undergo comprehensive maintenance schedules including:</p>
              
              <ul className="list-unstyled mt-3">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <strong>Daily inspections</strong> of all safety equipment
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <strong>Monthly maintenance</strong> of engines and mechanical systems
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <strong>Annual certifications</strong> by maritime authorities
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <strong>Continuous crew training</strong> on safety protocols
                </li>
              </ul>
              
              <div className="certifications mt-4">
                <h5>Our Certifications:</h5>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="badge bg-primary">ISO 9001</span>
                  <span className="badge bg-primary">Maritime Safety</span>
                  <span className="badge bg-primary">Environmental</span>
                  <span className="badge bg-primary">Quality Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
