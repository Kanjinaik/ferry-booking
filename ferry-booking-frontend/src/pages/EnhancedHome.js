import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/enhanced-home.css';
import api from '../api/axios';

const EnhancedHome = () => {
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

  // Background images array
  const backgroundImages = [
    'bg-ocean',
    'bg-sunset', 
    'bg-forest',
    'bg-royal',
    'bg-gold',
    'bg-neon'
  ];

  // Floating elements
  const floatingElements = [
    { icon: '⛴️', class: 'element-1' },
    { icon: '🌊', class: 'element-2' },
    { icon: '⛵', class: 'element-3' },
    { icon: '🚢', class: 'element-4' },
    { icon: '🌅', class: 'element-5' },
    { icon: '⚓', class: 'element-6' }
  ];

  // Enhanced features
  const enhancedFeatures = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Experience our high-speed ferries with cutting-edge technology and punctual departures'
    },
    {
      icon: '🛡️',
      title: 'Premium Safety',
      description: 'Advanced safety systems, trained crew, and modern equipment for your peace of mind'
    },
    {
      icon: '💎',
      title: 'Luxury Comfort',
      description: 'Premium seating, climate control, and onboard amenities for the ultimate journey'
    },
    {
      icon: '📱',
      title: 'Smart Booking',
      description: 'Seamless online booking with real-time availability and instant confirmations'
    },
    {
      icon: '🌍',
      title: 'Eco Friendly',
      description: 'Environmentally conscious operations with reduced carbon footprint'
    },
    {
      icon: '⭐',
      title: '5-Star Service',
      description: 'Exceptional customer service with dedicated support and special assistance'
    }
  ];

  // Enhanced stats
  const enhancedStats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '2,000+', label: 'Daily Journeys' },
    { number: '24/7', label: 'Customer Support' },
    { number: '18+', label: 'Years Experience' },
    { number: '99.9%', label: 'On-Time Performance' },
    { number: '50+', label: 'Awards Won' }
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
    <div className="enhanced-home">
      {/* Enhanced Header */}
      <header className="header-enhanced">
        <div className="header-container">
          <Link to="/" className="logo-enhanced">
            <span>⛴️</span>
            <span>M2M Ferries</span>
          </Link>
          <nav className="nav-menu-enhanced">
            <Link to="/" className="nav-link-enhanced">Home</Link>
            <Link to="/about" className="nav-link-enhanced">About Us</Link>
            <Link to="/fleet" className="nav-link-enhanced">Our Fleet</Link>
            <Link to="/explore" className="nav-link-enhanced">Explore</Link>
            <Link to="/faq" className="nav-link-enhanced">FAQ</Link>
            <Link to="/book" className="nav-link-enhanced">Book Now</Link>
          </nav>
          <div className="auth-buttons-enhanced">
            <Link to="/login" className="btn-login-enhanced">Login</Link>
            <Link to="/register" className="btn-register-enhanced">Register</Link>
          </div>
        </div>
      </header>

      {/* Background Container with Rotating Images */}
      <div className="background-container">
        {backgroundImages.map((bgClass, index) => (
          <div 
            key={index}
            className={`background-image ${bgClass} ${index === currentBgIndex ? 'active' : ''}`}
          />
        ))}
        
        {/* Floating Elements */}
        <div className="floating-elements">
          {floatingElements.map((element, index) => (
            <div key={index} className={`floating-element ${element.class}`}>
              {element.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="hero-section-enhanced">
        <div className="hero-overlay"></div>
        <div className="hero-content-enhanced">
          <h1 className="hero-title-enhanced">
            Experience the Future of Maritime Travel
          </h1>
          <p className="hero-subtitle-enhanced">
            Discover premium ferry services connecting Mumbai with Mandwa and Alibaug. 
            Fast, reliable, and luxurious journeys across the Arabian Sea with cutting-edge technology.
          </p>
          <div className="hero-cta-enhanced">
            <Link to="/book" className="cta-button btn-primary-enhanced">
              <span>🚀</span>
              <span>Book Your Journey</span>
              <span>→</span>
            </Link>
            <Link to="/fleet" className="cta-button btn-secondary-enhanced">
              <span>🚢</span>
              <span>Explore Our Fleet</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Widget */}
      <section className="booking-section-enhanced">
        <div className="booking-card-enhanced">
          <div className="booking-header-enhanced">
            <h2>Plan Your Premium Journey</h2>
            <div className="trip-toggle-enhanced">
              <button 
                className={`toggle-btn-enhanced ${tripType === 'one-way' ? 'active' : ''}`}
                onClick={() => setTripType('one-way')}
              >
                One Way
              </button>
              <button 
                className={`toggle-btn-enhanced ${tripType === 'round-trip' ? 'active' : ''}`}
                onClick={() => setTripType('round-trip')}
              >
                Round Trip
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="booking-form-enhanced">
            <div className="form-grid-enhanced">
              <div className="form-group-enhanced">
                <label>Departure Port</label>
                <select
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="form-select-enhanced"
                >
                  <option value="Mumbai">Mumbai Harbor</option>
                  <option value="Mandwa">Mandwa Terminal</option>
                  <option value="Alibaug">Alibaug Jetty</option>
                </select>
              </div>

              <div className="form-group-enhanced">
                <label>Destination</label>
                <select
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="form-select-enhanced"
                >
                  <option value="Mandwa">Mandwa Terminal</option>
                  <option value="Alibaug">Alibaug Jetty</option>
                  <option value="Mumbai">Mumbai Harbor</option>
                </select>
              </div>

              <div className="form-group-enhanced">
                <label>Departure Date</label>
                <input
                  type="date"
                  value={searchData.departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
                  className="form-input-enhanced"
                />
              </div>

              {tripType === 'round-trip' && (
                <div className="form-group-enhanced">
                  <label>Return Date</label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    min={searchData.departureDate}
                    onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                    className="form-input-enhanced"
                  />
                </div>
              )}

              <div className="form-group-enhanced">
                <label>Passengers</label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
                  className="form-select-enhanced"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-enhanced">
                <label>Vehicle Type</label>
                <select
                  value={searchData.vehicle}
                  onChange={(e) => setSearchData({...searchData, vehicle: e.target.value})}
                  className="form-select-enhanced"
                >
                  <option value="none">No Vehicle</option>
                  <option value="bike">🏍️ Motorcycle</option>
                  <option value="car">🚗 Car</option>
                  <option value="suv">🚙 SUV</option>
                  <option value="van">🚐 Van</option>
                </select>
              </div>
            </div>

            <button type="submit" className="search-button-enhanced">
              <span>🔍</span>
              <span>Find Premium Ferries</span>
              <span>⚡</span>
            </button>
          </form>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features-section-enhanced">
        <div className="section-header-enhanced">
          <h2>Why Choose M2M Premium Services</h2>
          <p>Experience the difference with our world-class ferry services</p>
        </div>
        
        <div className="features-grid-enhanced">
          {enhancedFeatures.map((feature, index) => (
            <div key={index} className="feature-card-enhanced" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="feature-icon-enhanced">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="stats-section-enhanced">
        <div className="stats-grid-enhanced">
          {enhancedStats.map((stat, index) => (
            <div key={index} className="stat-item-enhanced" data-aos="zoom-in" data-aos-delay={index * 150}>
              <div className="stat-number-enhanced">{stat.number}</div>
              <div className="stat-label-enhanced">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;