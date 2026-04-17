import React from 'react';
import '../styles/main.css';

const Explore = () => {
  const destinations = [
    {
      id: 1,
      name: "Mandwa Port",
      image: "/assets/images/mandwa1.jpg",
      description: "Historic port town with beautiful coastal views and local markets",
      highlights: ["Fishing Harbor", "Local Markets", "Coastal Walks", "Seafood Restaurants"],
      activities: ["Shopping", "Photography", "Local Cuisine", "Beach Walks"]
    },
    {
      id: 2,
      name: "Alibaug Beaches",
      image: "/assets/images/ferry-bg-1.jpg",
      description: "Pristine beaches perfect for relaxation and water activities",
      highlights: ["Clean Beaches", "Water Sports", "Beach Resorts", "Sunset Views"],
      activities: ["Swimming", "Jet Skiing", "Beach Volleyball", "Relaxation"]
    },
    {
      id: 3,
      name: "Murud-Janjira Fort",
      image: "/assets/images/ferry-hero-bg.jpg",
      description: "Historic sea fort with rich maritime history and stunning architecture",
      highlights: ["17th Century Architecture", "Maritime History", "Panoramic Views", "Historical Tours"],
      activities: ["Heritage Tour", "Photography", "History Learning", "Fort Exploration"]
    },
    {
      id: 4,
      name: "Kihim Beach",
      image: "/assets/images/about-us/about-banner.png",
      description: "Popular beach destination with water sports and recreational activities",
      highlights: ["Water Sports Center", "Beach Shacks", "Adventure Activities", "Family Friendly"],
      activities: ["Parasailing", "Banana Boat Ride", "Jet Ski", "Beach Games"]
    }
  ];

  const experiences = [
    {
      title: "Scenic Journey",
      description: "Enjoy breathtaking views of the Mumbai coastline and Arabian Sea",
      icon: "fa-mountain"
    },
    {
      title: "Cultural Experience",
      description: "Experience local culture and traditions of coastal Maharashtra",
      icon: "fa-landmark"
    },
    {
      title: "Adventure Activities",
      description: "Engage in various water sports and outdoor adventures",
      icon: "fa-water"
    },
    {
      title: "Relaxation",
      description: "Unwind with comfortable seating and peaceful sea journey",
      icon: "fa-spa"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/images/ferry-hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '400px'
      }}>
        <div className="hero-content">
          <h1 className="hero-title">Explore Destinations</h1>
          <p className="hero-subtitle">Discover amazing places along your maritime journey</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="explore-intro py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Discover Coastal Maharashtra</h2>
              <p className="lead">Experience the beauty of Maharashtra's coastline with our convenient ferry services connecting Mumbai to enchanting coastal destinations.</p>
              <p>From historic forts and pristine beaches to bustling local markets and peaceful fishing villages, each destination offers unique experiences for every type of traveler.</p>
              
              <div className="journey-stats mt-4">
                <div className="row">
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">4</div>
                    <div className="stat-label">Popular Routes</div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">12+</div>
                    <div className="stat-label">Destinations</div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number text-primary">25+</div>
                    <div className="stat-label">Activities</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/images/ferry-1.jpg" alt="Explore Destinations" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="destinations bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Popular Destinations</h2>
          
          <div className="row">
            {destinations.map((destination) => (
              <div key={destination.id} className="col-lg-6 mb-4">
                <div className="destination-card bg-white rounded shadow h-100">
                  <img src={destination.image} alt={destination.name} className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
                  <div className="card-body p-4">
                    <h3 className="card-title text-primary">{destination.name}</h3>
                    <p className="card-text">{destination.description}</p>
                    
                    <div className="destination-highlights mb-3">
                      <strong>Key Highlights:</strong>
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {destination.highlights.map((highlight, index) => (
                          <span key={index} className="badge bg-light text-dark">{highlight}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="destination-activities">
                      <strong>Activities:</strong>
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {destination.activities.map((activity, index) => (
                          <span key={index} className="badge bg-primary">{activity}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Experiences */}
      <section className="experiences py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Travel Experiences</h2>
          
          <div className="row">
            {experiences.map((experience, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="experience-card text-center p-4 bg-white rounded shadow h-100">
                  <div className="experience-icon mb-3">
                    <i className={`fas ${experience.icon} fa-3x text-primary`}></i>
                  </div>
                  <h4 className="mb-3">{experience.title}</h4>
                  <p className="text-muted">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="travel-tips bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Travel Tips & Information</h2>
          
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="tip-card bg-white p-4 rounded shadow">
                <h4 className="text-primary mb-3">
                  <i className="fas fa-clock me-2"></i>Best Time to Visit
                </h4>
                <p>October to May offers the best weather conditions with clear skies and calm seas. Avoid monsoon season (June-September) for safety reasons.</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="tip-card bg-white p-4 rounded shadow">
                <h4 className="text-primary mb-3">
                  <i className="fas fa-ticket-alt me-2"></i>Booking Advice
                </h4>
                <p>Book in advance during peak seasons and weekends. Consider early morning departures for smoother travel and better views.</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="tip-card bg-white p-4 rounded shadow">
                <h4 className="text-primary mb-3">
                  <i className="fas fa-suitcase me-2"></i>What to Carry
                </h4>
                <p>Light clothing, sunscreen, hat, camera, and valid ID. For vehicle travel, ensure proper documentation and fuel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Destination Gallery</h2>
          
          <div className="row">
            <div className="col-md-3 col-6 mb-3">
              <img src="/assets/images/ferry-1.jpg" alt="Destination 1" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-3 col-6 mb-3">
              <img src="/assets/images/ferry-2.jpg" alt="Destination 2" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-3 col-6 mb-3">
              <img src="/assets/images/ferry-hero-bg.jpg" alt="Destination 3" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-3 col-6 mb-3">
              <img src="/assets/images/ferry-bg-1.jpg" alt="Destination 4" className="img-fluid rounded shadow" />
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg">
              <i className="fas fa-images me-2"></i>View Full Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
