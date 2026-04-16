// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import '../styles/modern-home.css';
// // import api from '../api/axios';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';

// // const ModernHome = () => {
// //   const navigate = useNavigate();
// //   const [tripType, setTripType] = useState('one-way');
// //   const [ferries, setFerries] = useState([]);
// //   const [searchData, setSearchData] = useState({
// //     from: 'Mumbai',
// //     to: 'Mandwa',
// //     departureDate: '',
// //     returnDate: '',
// //     passengers: 1,
// //     adults: 2,
// //     children: 0,
// //     vehicle: 'none',
// //   });

// //   useEffect(() => {
// //     // Initialize AOS
// //     AOS.init({
// //       duration: 1000,
// //       once: true,
// //       easing: 'ease-out-cubic'
// //     });

// //     const today = new Date();
// //     const tomorrow = new Date(today);
// //     tomorrow.setDate(tomorrow.getDate() + 1);

// //     setSearchData(prev => ({
// //       ...prev,
// //       departureDate: today.toISOString().split('T')[0],
// //       returnDate: tomorrow.toISOString().split('T')[0],
// //     }));

// //     // Fetch ferries data
// //     const fetchFerries = async () => {
// //       try {
// //         const response = await api.get('/ferries');
// //         setFerries(response.data);
// //       } catch (error) {
// //         console.error('Error fetching ferries:', error);
// //       }
// //     };

// //     fetchFerries();
// //   }, []);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
    
// //     const matchingFerry = ferries.find(
// //       ferry => ferry.route === `${searchData.from} → ${searchData.to}`
// //     );

// //     if (matchingFerry) {
// //       navigate(`/book/${matchingFerry.id}`);
// //     } else {
// //       alert('No ferry available for the selected route');
// //     }
// //   };

// //   const features = [
// //     {
// //       icon: '⛴️',
// //       title: 'Fast & Reliable',
// //       description: 'Regular ferry services with punctual departures and modern vessels'
// //     },
// //     {
// //       icon: '🛡️',
// //       title: 'Safety First',
// //       description: 'All ferries equipped with modern safety equipment and trained crew'
// //     },
// //     {
// //       icon: '舒适的',
// //       title: 'Comfortable',
// //       description: 'Air-conditioned cabins with comfortable seating for all passengers'
// //     },
// //     {
// //       icon: '📱',
// //       title: 'Easy Booking',
// //       description: 'Simple online booking process with instant confirmation'
// //     }
// //   ];

// //   const stats = [
// //     { number: '5000+', label: 'Happy Customers' },
// //     { number: '1000+', label: 'Daily Trips' },
// //     { number: '24/7', label: 'Service Available' },
// //     { number: '15+', label: 'Years Experience' }
// //   ];

// //   return (
// //     <div className="modern-home">
// //       {/* Hero Section with Animated Background */}
// //       <section className="hero-section">
// //         <div className="hero-background">
// //           <div className="wave-animation"></div>
// //           <div className="floating-elements">
// //             <div className="element element-1">⛴️</div>
// //             <div className="element element-2">🌊</div>
// //             <div className="element element-3">⛵</div>
// //             <div className="element element-4">🚢</div>
// //           </div>
// //         </div>
        
// //         <div className="hero-content">
// //           <div className="hero-text">
// //             <h1 className="hero-title">
// //               <span className="title-main">Experience the</span>
// //               <span className="title-highlight">Best of Maritime Travel</span>
// //             </h1>
// //             <p className="hero-subtitle">
// //               Connect Mumbai with Mandwa and Alibaug through our premium ferry services. 
// //               Fast, reliable, and comfortable journeys across the Arabian Sea.
// //             </p>
// //             <div className="hero-cta">
// //               <Link to="/book" className="btn-primary hero-btn">
// //                 Book Your Journey
// //                 <span className="btn-arrow">→</span>
// //               </Link>
// //               <Link to="/fleet" className="btn-secondary hero-btn">
// //                 Explore Our Fleet
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Modern Booking Widget */}
// //       <section className="booking-widget-section">
// //         <div className="container">
// //           <div className="booking-card glass-morphism">
// //             <div className="booking-header">
// //               <h2>Plan Your Journey</h2>
// //               <div className="trip-toggle">
// //                 <button 
// //                   className={`toggle-btn ${tripType === 'one-way' ? 'active' : ''}`}
// //                   onClick={() => setTripType('one-way')}
// //                 >
// //                   One Way
// //                 </button>
// //                 <button 
// //                   className={`toggle-btn ${tripType === 'round-trip' ? 'active' : ''}`}
// //                   onClick={() => setTripType('round-trip')}
// //                 >
// //                   Round Trip
// //                 </button>
// //               </div>
// //             </div>

// //             <form onSubmit={handleSearch} className="booking-form">
// //               <div className="form-grid">
// //                 <div className="form-group">
// //                   <label>From</label>
// //                   <select
// //                     value={searchData.from}
// //                     onChange={(e) => setSearchData({...searchData, from: e.target.value})}
// //                     className="form-select"
// //                   >
// //                     <option value="Mumbai">Mumbai</option>
// //                     <option value="Mandwa">Mandwa</option>
// //                     <option value="Alibaug">Alibaug</option>
// //                   </select>
// //                 </div>

// //                 <div className="form-group">
// //                   <label>To</label>
// //                   <select
// //                     value={searchData.to}
// //                     onChange={(e) => setSearchData({...searchData, to: e.target.value})}
// //                     className="form-select"
// //                   >
// //                     <option value="Mandwa">Mandwa</option>
// //                     <option value="Alibaug">Alibaug</option>
// //                     <option value="Mumbai">Mumbai</option>
// //                   </select>
// //                 </div>

// //                 <div className="form-group">
// //                   <label>Departure Date</label>
// //                   <input
// //                     type="date"
// //                     value={searchData.departureDate}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
// //                     className="form-input"
// //                   />
// //                 </div>

// //                 {tripType === 'round-trip' && (
// //                   <div className="form-group">
// //                     <label>Return Date</label>
// //                     <input
// //                       type="date"
// //                       value={searchData.returnDate}
// //                       min={searchData.departureDate}
// //                       onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
// //                       className="form-input"
// //                     />
// //                   </div>
// //                 )}

// //                 <div className="form-group">
// //                   <label>Passengers</label>
// //                   <select
// //                     value={searchData.passengers}
// //                     onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
// //                     className="form-select"
// //                   >
// //                     {[...Array(10)].map((_, i) => (
// //                       <option key={i + 1} value={i + 1}>
// //                         {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="form-group">
// //                   <label>Vehicle (Optional)</label>
// //                   <select
// //                     value={searchData.vehicle}
// //                     onChange={(e) => setSearchData({...searchData, vehicle: e.target.value})}
// //                     className="form-select"
// //                   >
// //                     <option value="none">No Vehicle</option>
// //                     <option value="bike">Bike</option>
// //                     <option value="car">Car</option>
// //                     <option value="suv">SUV</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <button type="submit" className="search-button">
// //                 <span className="btn-text">Search Ferries</span>
// //                 <span className="btn-icon">🔍</span>
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="features-section">
// //         <div className="container">
// //           <div className="section-header">
// //             <h2>Why Choose M2M Ferries</h2>
// //             <p>Experience the best maritime journey with our premium services</p>
// //           </div>
          
// //           <div className="features-grid">
// //             {features.map((feature, index) => (
// //               <div key={index} className="feature-card" data-aos="fade-up" data-aos-delay={index * 100}>
// //                 <div className="feature-icon">{feature.icon}</div>
// //                 <h3>{feature.title}</h3>
// //                 <p>{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="stats-section">
// //         <div className="container">
// //           <div className="stats-grid">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="stat-item" data-aos="zoom-in" data-aos-delay={index * 150}>
// //                 <div className="stat-number">{stat.number}</div>
// //                 <div className="stat-label">{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="cta-section">
// //         <div className="container">
// //           <div className="cta-content">
// //             <h2>Ready to Begin Your Journey?</h2>
// //             <p>Book your ferry tickets now and experience the comfort of maritime travel</p>
// //             <div className="cta-buttons">
// //               <Link to="/book" className="btn-primary cta-btn">
// //                 Book Now
// //               </Link>
// //               <Link to="/contact" className="btn-outline cta-btn">
// //                 Contact Us
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default ModernHome;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/modern-home.css';
// import api from '../api/axios';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const ModernHome = () => {
//   const navigate = useNavigate();

//   const [tripType, setTripType] = useState('one-way');
//   const [ferries, setFerries] = useState([]);

//   const [searchData, setSearchData] = useState({
//     from: 'Mumbai',
//     to: 'Mandwa',
//     departureDate: '',
//     returnDate: '',
//     passengers: 1,
//     vehicle: 'none',
//   });

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: 'ease-out-cubic',
//     });

//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     setSearchData((prev) => ({
//       ...prev,
//       departureDate: today.toISOString().split('T')[0],
//       returnDate: tomorrow.toISOString().split('T')[0],
//     }));

//     const fetchFerries = async () => {
//       try {
//         const res = await api.get('/ferries');
//         setFerries(res.data);
//       } catch (err) {
//         console.error('Error fetching ferries:', err);
//       }
//     };

//     fetchFerries();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!searchData.passengers) {
//       alert('Please select number of passengers');
//       return;
//     }

//     const matchingFerry = ferries.find(
//       (ferry) => ferry.route === `${searchData.from} → ${searchData.to}`
//     );

//     if (!matchingFerry) {
//       alert('No ferry available for the selected route');
//       return;
//     }

//     // ✅ PASS SEARCH DATA TO BOOKING PAGE
//     navigate(`/book/${matchingFerry.id}`, {
//       state: searchData,
//     });
//   };

//   return (
//     <div className="modern-home">
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Experience the Best of Maritime Travel</h1>
//           <p>Mumbai • Mandwa • Alibaug</p>
//         </div>
//       </section>

//       {/* BOOKING FORM */}
//       <section className="booking-widget-section">
//         <div className="container">
//           <form onSubmit={handleSearch} className="booking-form">
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>From</label>
//                 <select
//                   value={searchData.from}
//                   onChange={(e) =>
//                     setSearchData({ ...searchData, from: e.target.value })
//                   }
//                 >
//                   <option value="Mumbai">Mumbai</option>
//                   <option value="Mandwa">Mandwa</option>
//                   <option value="Alibaug">Alibaug</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>To</label>
//                 <select
//                   value={searchData.to}
//                   onChange={(e) =>
//                     setSearchData({ ...searchData, to: e.target.value })
//                   }
//                 >
//                   <option value="Mandwa">Mandwa</option>
//                   <option value="Alibaug">Alibaug</option>
//                   <option value="Mumbai">Mumbai</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Departure Date</label>
//                 <input
//                   type="date"
//                   value={searchData.departureDate}
//                   onChange={(e) =>
//                     setSearchData({
//                       ...searchData,
//                       departureDate: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {tripType === 'round-trip' && (
//                 <div className="form-group">
//                   <label>Return Date</label>
//                   <input
//                     type="date"
//                     value={searchData.returnDate}
//                     onChange={(e) =>
//                       setSearchData({
//                         ...searchData,
//                         returnDate: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>Passengers</label>
//                 <select
//                   value={searchData.passengers}
//                   onChange={(e) =>
//                     setSearchData({
//                       ...searchData,
//                       passengers: Number(e.target.value),
//                     })
//                   }
//                 >
//                   {[...Array(10)].map((_, i) => (
//                     <option key={i + 1} value={i + 1}>
//                       {i + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Vehicle</label>
//                 <select
//                   value={searchData.vehicle}
//                   onChange={(e) =>
//                     setSearchData({
//                       ...searchData,
//                       vehicle: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="none">No Vehicle</option>
//                   <option value="bike">Bike</option>
//                   <option value="car">Car</option>
//                 </select>
//               </div>
//             </div>

//             <button type="submit">Search Ferries</button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ModernHome;

import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ModernBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state || {};

  const [passengers, setPassengers] = useState(
    Number(bookingData.passengers) || 1
  );
  const [departureDate] = useState(
    bookingData.departureDate || ''
  );
  const [returnDate] = useState(
    bookingData.returnDate || null
  );
  const [vehicle] = useState(
    bookingData.vehicle || 'none'
  );
  const [from] = useState(bookingData.from || '');
  const [to] = useState(bookingData.to || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      ferry_id: Number(id),
      passengers: Number(passengers),
      departure_date: departureDate,
      return_date: returnDate,
      vehicle,
      from,
      to,
    };

    console.log('📦 FINAL PAYLOAD SENT TO API:', payload);

    try {
      await api.post('/bookings', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      alert('✅ Booking Successful');
      navigate('/confirmation');
    } catch (err) {
      console.error('❌ Booking error:', err.response?.data || err);

      setError(
        err.response?.data?.message ||
        'Booking failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-booking">
      <h1>Confirm Booking</h1>

      <form onSubmit={handleSubmit}>
        <p><strong>Route:</strong> {from} → {to}</p>

        <label>Passengers</label>
        <select
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <p><strong>Departure:</strong> {departureDate}</p>
        {returnDate && <p><strong>Return:</strong> {returnDate}</p>}
        <p><strong>Vehicle:</strong> {vehicle}</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default ModernBooking;
