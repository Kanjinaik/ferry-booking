import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/image-home.css';
import api from '../api/axios';

const ImageHome = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('one-way');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [ferries, setFerries] = useState([]);
  
  const [searchData, setSearchData] = useState({
    from: 'Mumbai',
    to: 'Mandwa',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    vehicle: 'none',
  });

  // Real ferry background images
  const backgroundImages = [
    'bg-ferry-1',
    'bg-ferry-2', 
    'bg-ferry-3',
    'bg-ferry-4',
    'bg-ferry-5',
    'bg-ferry-6'
  ];

  // Maritime floating elements
  const floatingElements = [
    { icon: '⛴️', class: 'element-img-1' },
    { icon: '🌊', class: 'element-img-2' },
    { icon: '⛵', class: 'element-img-3' },
    { icon: '🚢', class: 'element-img-4' },
    { icon: '🌅', class: 'element-img-5' },
    { icon: '⚓', class: 'element-img-6' }
  ];

  // Premium features for ferry service
  const premiumFeatures = [
    {
      icon: '🚀',
      title: 'High-Speed Vessels',
      description: 'Modern high-speed ferries with advanced navigation systems for swift and comfortable journeys across the Arabian Sea'
    },
    {
      icon: '🛡️',
      title: 'Advanced Safety Systems',
      description: 'State-of-the-art safety equipment, trained maritime crew, and 24/7 monitoring for complete passenger security'
    },
    {
      icon: '💎',
      title: 'Premium Comfort',
      description: 'Luxurious climate-controlled cabins with premium seating, entertainment systems, and onboard amenities'
    },
    {
      icon: '📱',
      title: 'Digital Booking Platform',
      description: 'Seamless online booking with real-time availability, instant confirmations, and mobile ticketing'
    },
    {
      icon: '🌍',
      title: 'Eco-Conscious Operations',
      description: 'Environmentally friendly ferries with reduced emissions and sustainable operational practices'
    },
    {
      icon: '⭐',
      title: 'Exceptional Service',
      description: 'Dedicated customer support, special assistance for passengers, and premium hospitality standards'
    }
  ];

  // Enhanced statistics
  const premiumStats = [
    { number: '15,000+', label: 'Satisfied Passengers Monthly' },
    { number: '3,000+', label: 'Daily Ferry Crossings' },
    { number: '24/7', label: 'Round-the-Clock Support' },
    { number: '20+', label: 'Years Maritime Excellence' },
    { number: '99.8%', label: 'On-Time Performance Rate' },
    { number: '100+', label: 'Safety Certifications' }
  ];

  useEffect(() => {
    // Set today's date as default
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setSearchData(prev => ({
      ...prev,
      departureDate: today.toISOString().split('T')[0],
      returnDate: tomorrow.toISOString().split('T')[0],
    }));

    // Fetch ferries data
    const fetchFerries = async () => {
      try {
        const response = await api.get('/ferries');
        setFerries(response.data);
      } catch (error) {
        console.error('Error fetching ferries:', error);
      }
    };

    fetchFerries();

    // Rotate backgrounds every 5 seconds
    const bgInterval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(bgInterval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const matchingFerry = ferries.find(
      ferry => ferry.route === `${searchData.from} → ${searchData.to}`
    );

    if (matchingFerry) {
      navigate(`/book/${matchingFerry.id}`);
    } else {
      alert('No ferry available for the selected route');
    }
  };

  return (
    <div className="image-home">
      {/* Enhanced Header with Image Background */}
      <header className="header-images">
        <div className="header-container-images">
          <Link to="/" className="logo-images">
            <span>⛴️</span>
            <span>M2M Ferries</span>
          </Link>
          <nav className="nav-menu-images">
            <Link to="/" className="nav-link-images">Home</Link>
            <Link to="/about" className="nav-link-images">About Us</Link>
            <Link to="/fleet" className="nav-link-images">Our Fleet</Link>
            <Link to="/explore" className="nav-link-images">Destinations</Link>
            <Link to="/faq" className="nav-link-images">Support</Link>
            <Link to="/book" className="nav-link-images">Book Now</Link>
          </nav>
          <div className="auth-buttons-images">
            <Link to="/login" className="btn-login-images">Sign In</Link>
            <Link to="/register" className="btn-register-images">Join Now</Link>
          </div>
        </div>
      </header>

      {/* Image Background Container */}
      <div className="background-container-images">
        {backgroundImages.map((bgClass, index) => (
          <div 
            key={index}
            className={`background-image-real ${bgClass} ${index === currentBgIndex ? 'active' : ''}`}
          />
        ))}
        
        {/* Enhanced Floating Elements */}
        <div className="floating-elements-images">
          {floatingElements.map((element, index) => (
            <div key={index} className={`floating-element-image ${element.class}`}>
              {element.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Hero Section with Images */}
      <section className="hero-section-images">
        <div className="hero-overlay-images"></div>
        <div className="hero-content-images">
          <h1 className="hero-title-images">
            Premium Maritime Journeys Across the Arabian Sea
          </h1>
          <p className="hero-subtitle-images">
            Experience world-class ferry services connecting Mumbai with Mandwa and Alibaug. 
            Modern vessels, exceptional comfort, and reliable schedules for your perfect coastal journey.
          </p>
          <div className="hero-cta-images">
            <Link to="/book" className="cta-button-image btn-primary-image">
              <span>🚀</span>
              <span>Reserve Your Passage</span>
              <span>→</span>
            </Link>
            <Link to="/fleet" className="cta-button-image btn-secondary-image">
              <span>🚢</span>
              <span>Explore Our Vessels</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Widget */}
      <section className="booking-section-images">
        <div className="booking-card-images">
          <div className="booking-header-images">
            <h2>Plan Your Premium Voyage</h2>
            <div className="trip-toggle-images">
              <button 
                className={`toggle-btn-images ${tripType === 'one-way' ? 'active' : ''}`}
                onClick={() => setTripType('one-way')}
              >
                One Way Journey
              </button>
              <button 
                className={`toggle-btn-images ${tripType === 'round-trip' ? 'active' : ''}`}
                onClick={() => setTripType('round-trip')}
              >
                Round Trip
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="booking-form-images">
            <div className="form-grid-images">
              <div className="form-group-images">
                <label>Departure Port</label>
                <select
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="form-select-images"
                >
                  <option value="Mumbai">Mumbai Harbor Terminal</option>
                  <option value="Mandwa">Mandwa Ferry Terminal</option>
                  <option value="Alibaug">Alibaug Jetty Point</option>
                </select>
              </div>

              <div className="form-group-images">
                <label>Destination</label>
                <select
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="form-select-images"
                >
                  <option value="Mandwa">Mandwa Ferry Terminal</option>
                  <option value="Alibaug">Alibaug Jetty Point</option>
                  <option value="Mumbai">Mumbai Harbor Terminal</option>
                </select>
              </div>

              <div className="form-group-images">
                <label>Departure Date</label>
                <input
                  type="date"
                  value={searchData.departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
                  className="form-input-images"
                />
              </div>

              {tripType === 'round-trip' && (
                <div className="form-group-images">
                  <label>Return Date</label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    min={searchData.departureDate}
                    onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                    className="form-input-images"
                  />
                </div>
              )}

              <div className="form-group-images">
                <label>Passenger Count</label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
                  className="form-select-images"
                >
                  {[...Array(15)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-images">
                <label>Vehicle Transportation</label>
                <select
                  value={searchData.vehicle}
                  onChange={(e) => setSearchData({...searchData, vehicle: e.target.value})}
                  className="form-select-images"
                >
                  <option value="none">No Vehicle Transport</option>
                  <option value="bike">🏍️ Motorcycle/Bike</option>
                  <option value="car">🚗 Compact Car</option>
                  <option value="suv">🚙 SUV/Jeep</option>
                  <option value="van">🚐 Mini Van</option>
                  <option value="truck">🚚 Small Truck</option>
                </select>
              </div>
            </div>

            <button type="submit" className="search-button-images">
              <span>🔍</span>
              <span>Find Available Ferries</span>
              <span>⚡</span>
            </button>
          </form>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="features-section-images">
        <div className="section-header-images">
          <h2>Why Choose M2M Premium Ferry Services</h2>
          <p>Experience the pinnacle of maritime travel with our world-class ferry operations</p>
        </div>
        
        <div className="features-grid-images">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="feature-card-images" data-aos="fade-up" data-aos-delay={index * 120}>
              <div className="feature-icon-images">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="stats-section-images">
        <div className="stats-grid-images">
          {premiumStats.map((stat, index) => (
            <div key={index} className="stat-item-images" data-aos="zoom-in" data-aos-delay={index * 180}>
              <div className="stat-number-images">{stat.number}</div>
              <div className="stat-label-images">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImageHome;