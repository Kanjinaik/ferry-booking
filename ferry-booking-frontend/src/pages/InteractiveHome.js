import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/interactive-home.css';

const fallbackFerries = [
  {
    id: 1,
    name: 'M2M-1',
    type: 'High-Speed Ro-Pax Ferry',
    capacity: '500 passengers, 145 vehicles',
    features: ['AC Lounge', 'Outdoor Seating', 'Cafeteria', 'Entertainment'],
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    status: 'Active',
    speed: '35 knots',
    amenities: ['WiFi', 'Charging Points', 'Food Service', 'Restrooms'],
    route: 'Mumbai -> Alibaug',
    vehiclePrice: 500,
  },
  {
    id: 2,
    name: 'M2M-2',
    type: 'Premium Passenger Ferry',
    capacity: '400 passengers',
    features: ['Luxury Seating', 'Panoramic Windows', 'VIP Lounge', 'Bar'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    status: 'Active',
    speed: '30 knots',
    amenities: ['Premium Dining', 'Entertainment', 'WiFi', 'Comfort Seats'],
    route: 'Mumbai -> Mandwa',
    vehiclePrice: 500,
  },
  {
    id: 3,
    name: 'M2M-3',
    type: 'Vehicle Transport Ferry',
    capacity: '300 passengers, 200 vehicles',
    features: ['Large Vehicle Deck', 'Covered Parking', 'Loading Ramp', 'Security'],
    image: 'https://images.unsplash.com/photo-1534437546397-1d174e709c4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    status: 'Active',
    speed: '25 knots',
    amenities: ['Vehicle Security', 'Passenger Lounge', 'Basic Amenities'],
    route: 'Alibaug -> Mumbai',
    vehiclePrice: 500,
  },
  {
    id: 4,
    name: 'M2M-4',
    type: 'Eco-Friendly Ferry',
    capacity: '350 passengers',
    features: ['Solar Panels', 'Low Emission', 'Recycling System', 'Green Design'],
    image: 'https://images.unsplash.com/photo-1522093007477-0e4f1a004170?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    status: 'Maintenance',
    speed: '28 knots',
    amenities: ['Eco Lounge', 'Educational Displays', 'Sustainable Materials'],
    route: 'Mandwa -> Mumbai',
    vehiclePrice: 500,
  },
];

const premiumFeatures = [
  {
    icon: 'High-Speed',
    title: 'High-Speed Vessels',
    description: 'Modern high-speed ferries with advanced navigation systems for swift and comfortable journeys across the Arabian Sea',
  },
  {
    icon: 'Safety',
    title: 'Advanced Safety Systems',
    description: 'State-of-the-art safety equipment, trained maritime crew, and 24/7 monitoring for complete passenger security',
  },
  {
    icon: 'Comfort',
    title: 'Premium Comfort',
    description: 'Luxurious climate-controlled cabins with premium seating, entertainment systems, and onboard amenities',
  },
  {
    icon: 'Booking',
    title: 'Digital Booking Platform',
    description: 'Seamless online booking with real-time availability, instant confirmations, and mobile ticketing',
  },
  {
    icon: 'Eco',
    title: 'Eco-Conscious Operations',
    description: 'Environmentally friendly ferries with reduced emissions and sustainable operational practices',
  },
  {
    icon: 'Service',
    title: 'Exceptional Service',
    description: 'Dedicated customer support, special assistance for passengers, and premium hospitality standards',
  },
];

const parseRoute = (route) => {
  const [from = '', to = ''] = String(route || '').split('->').map((part) => part.trim());
  return { from, to };
};

const normalizeFerry = (ferry, fallbackImage) => ({
  ...ferry,
  route: String(ferry.route || '').replace(/\s*->\s*/g, ' -> ').trim(),
  image: ferry.image || fallbackImage,
  vehiclePrice: ferry.vehiclePrice || 500,
  status: ferry.status === 'active' ? 'Active' : ferry.status === 'maintenance' ? 'Maintenance' : ferry.status || 'Active',
});

const InteractiveHome = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('one-way');
  const [currentBgIndex] = useState(0);
  const [selectedFerry, setSelectedFerry] = useState(null);
  const [showFleetGallery, setShowFleetGallery] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [ferries, setFerries] = useState(fallbackFerries);

  const [searchData, setSearchData] = useState({
    from: 'Mumbai',
    to: 'Mandwa',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    vehicle: 'none',
  });

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setSearchData((prev) => ({
      ...prev,
      departureDate: today.toISOString().split('T')[0],
      returnDate: tomorrow.toISOString().split('T')[0],
    }));

    const fetchFerries = async () => {
      try {
        const response = await api.get('/ferries');
        if (response.data?.length) {
          setFerries(
            response.data.map((ferry, index) =>
              normalizeFerry(ferry, fallbackFerries[index % fallbackFerries.length]?.image)
            )
          );
        }
      } catch (error) {
        console.error('Error fetching ferries:', error);
      }
    };

    fetchFerries();
  }, []);

  const routePairs = ferries.map((ferry) => parseRoute(ferry.route));
  const fromOptions = Array.from(new Set(routePairs.map((pair) => pair.from).filter(Boolean)));
  const toOptions = Array.from(
    new Set(routePairs.filter((pair) => pair.from === searchData.from).map((pair) => pair.to).filter(Boolean))
  );

  useEffect(() => {
    if (fromOptions.length > 0 && !fromOptions.includes(searchData.from)) {
      setSearchData((prev) => ({ ...prev, from: fromOptions[0] }));
      return;
    }

    if (toOptions.length > 0 && !toOptions.includes(searchData.to)) {
      setSearchData((prev) => ({ ...prev, to: toOptions[0] }));
    }
  }, [fromOptions, searchData.from, searchData.to, toOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');

    const routeKey = `${searchData.from} -> ${searchData.to}`;
    const matchingFerry = ferries.find((ferry) => ferry.route === routeKey);

    if (!matchingFerry) {
      setSearchError('No ferry available for the selected route');
      return;
    }

    navigate(`/book/${matchingFerry.id}`, { state: { ferry: matchingFerry } });
  };

  const handleFerryClick = (ferry) => {
    setSelectedFerry(ferry);
    setShowFleetGallery(true);
  };

  const closeFleetGallery = () => {
    setShowFleetGallery(false);
    setSelectedFerry(null);
  };

  const bookSelectedFerry = () => {
    if (selectedFerry) {
      navigate(`/book/${selectedFerry.id}`, { state: { ferry: selectedFerry } });
    }
  };

  return (
    <div className="interactive-home">
      <header className="header-interactive">
        <div className="header-container-interactive">
          <Link to="/" className="logo-interactive">
            <span>Ferry</span>
            <span>M2M Ferries</span>
          </Link>
          <nav className="nav-menu-interactive">
            <Link to="/" className="nav-link-interactive">Home</Link>
            <Link to="/about" className="nav-link-interactive">About Us</Link>
            <button onClick={() => setShowFleetGallery(true)} className="nav-link-interactive fleet-button">
              Our Fleet
            </button>
            <Link to="/explore" className="nav-link-interactive">Destinations</Link>
            <Link to="/faq" className="nav-link-interactive">Support</Link>
            <Link to="/book" className="nav-link-interactive">Book Now</Link>
          </nav>
          <div className="auth-buttons-interactive">
            <Link to="/login" className="btn-login-interactive">Sign In</Link>
            <Link to="/register" className="btn-register-interactive">Join Now</Link>
          </div>
        </div>
      </header>

      <div className="ferry-background-container">
        {ferries.map((ferry, index) => (
          <div
            key={ferry.id}
            className={`ferry-background ${index === currentBgIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${ferry.image})`,
            }}
            onClick={() => handleFerryClick(ferry)}
          >
            <div className="ferry-info-overlay">
              <div className="ferry-name">{ferry.name}</div>
              <div className="ferry-type">{ferry.type || ferry.route}</div>
              <div className="click-hint">Click to explore this vessel</div>
            </div>
          </div>
        ))}
      </div>

      <section className="hero-section-interactive">
        <div className="hero-overlay-interactive"></div>
        <div className="hero-content-interactive">
          <h1 className="hero-title-interactive">Experience Premium Maritime Journeys</h1>
          <p className="hero-subtitle-interactive">
            Discover our modern fleet of high-speed ferries connecting Mumbai with Mandwa and Alibaug.
          </p>
          <div className="hero-cta-interactive">
            <button onClick={() => setShowFleetGallery(true)} className="cta-button-interactive btn-primary-interactive">
              <span>Explore Our Fleet</span>
            </button>
            <Link to="/book" className="cta-button-interactive btn-secondary-interactive">
              <span>Book Instantly</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="booking-section-interactive">
        <div className="booking-card-interactive">
          <div className="booking-header-interactive">
            <h2>Plan Your Premium Voyage</h2>
            <div className="trip-toggle-interactive">
              <button
                className={`toggle-btn-interactive ${tripType === 'one-way' ? 'active' : ''}`}
                onClick={() => setTripType('one-way')}
              >
                One Way Journey
              </button>
              <button
                className={`toggle-btn-interactive ${tripType === 'round-trip' ? 'active' : ''}`}
                onClick={() => setTripType('round-trip')}
              >
                Round Trip
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="booking-form-interactive">
            <div className="form-grid-interactive">
              <div className="form-group-interactive">
                <label>Departure Port</label>
                <select
                  value={searchData.from}
                  onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                  className="form-select-interactive"
                >
                  {fromOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-interactive">
                <label>Destination</label>
                <select
                  value={searchData.to}
                  onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                  className="form-select-interactive"
                >
                  {toOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-interactive">
                <label>Departure Date</label>
                <input
                  type="date"
                  value={searchData.departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchData({ ...searchData, departureDate: e.target.value })}
                  className="form-input-interactive"
                />
              </div>

              {tripType === 'round-trip' && (
                <div className="form-group-interactive">
                  <label>Return Date</label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    min={searchData.departureDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                    className="form-input-interactive"
                  />
                </div>
              )}

              <div className="form-group-interactive">
                <label>Passenger Count</label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value, 10) })}
                  className="form-select-interactive"
                >
                  {[...Array(15)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-interactive">
                <label>Vehicle Transportation</label>
                <select
                  value={searchData.vehicle}
                  onChange={(e) => setSearchData({ ...searchData, vehicle: e.target.value })}
                  className="form-select-interactive"
                >
                  <option value="none">No Vehicle Transport</option>
                  <option value="bike">Motorcycle/Bike</option>
                  <option value="car">Compact Car</option>
                  <option value="truck">Small Truck</option>
                </select>
              </div>
            </div>

            <button type="submit" className="search-button-interactive">
              <span>Find Available Ferries</span>
            </button>

            {searchError && (
              <div style={{ marginTop: '14px', color: '#b42318', fontWeight: 600 }}>
                {searchError}
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="features-section-interactive">
        <div className="section-header-interactive">
          <h2>Why Choose M2M Premium Ferry Services</h2>
          <p>Experience the pinnacle of maritime travel with our world-class ferry operations</p>
        </div>

        <div className="features-grid-interactive">
          {premiumFeatures.map((feature) => (
            <div key={feature.title} className="feature-card-interactive">
              <div className="feature-icon-interactive">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {showFleetGallery && (
        <div className="fleet-gallery-modal">
          <div className="modal-overlay" onClick={closeFleetGallery}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={closeFleetGallery}>x</button>

            {selectedFerry ? (
              <div className="ferry-detail">
                <div className="ferry-image-container">
                  <img src={selectedFerry.image} alt={selectedFerry.name} />
                  <div className={`status-badge ${String(selectedFerry.status).toLowerCase()}`}>
                    {selectedFerry.status}
                  </div>
                </div>

                <div className="ferry-details">
                  <h2>{selectedFerry.name}</h2>
                  <h3>{selectedFerry.type || selectedFerry.route}</h3>

                  <div className="ferry-specs">
                    <div className="spec-item">
                      <span className="spec-label">Capacity:</span>
                      <span className="spec-value">{selectedFerry.capacity || selectedFerry.seats}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Speed:</span>
                      <span className="spec-value">{selectedFerry.speed || selectedFerry.departure_time}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Amenities:</span>
                      <span className="spec-value">{selectedFerry.amenities?.join(', ') || 'Premium onboard facilities'}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Route:</span>
                      <span className="spec-value">{selectedFerry.route}</span>
                    </div>
                  </div>

                  <button className="cta-button-interactive btn-primary-interactive" onClick={bookSelectedFerry}>
                    Book This Ferry Now
                  </button>
                </div>
              </div>
            ) : (
              <div>No ferry selected.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveHome;
