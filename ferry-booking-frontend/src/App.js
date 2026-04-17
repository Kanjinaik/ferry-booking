import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import './styles/authentic.css';

// ✅ Import pages/components
import Book from "./pages/ModernBooking";       // Modern Booking page
import MyBookings from "./pages/MyBookings";    // User bookings page
import AdminDashboard from "./pages/ModernAdminDashboard"; // ✅ Modern Admin dashboard
import Home from "./pages/InteractiveHome";        // Enhanced Home page
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";             // About Us page
import Fleet from "./pages/fleet";             // Our Fleet page
import Explore from "./pages/explore";          // Explore Destinations page
import FAQ from "./pages/faq";                 // FAQ page

// ✅ Import components
import ImageCursor from "./components/ImageCursor"; // Rotating Custom cursor

// --------------------
// Header Component - Authentic M2M Design
// --------------------
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">⛴️</span>
          <span>Payfikar Travels</span>
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/fleet" className="nav-link">Our Fleet</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
          <Link to="/book" className="nav-link">Book Now</Link>
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              {userRole === 'admin' && (
                <Link to="/admin" className="nav-link">Admin Panel</Link>
              )}
              <button onClick={handleLogout} className="btn-login">Logout</button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}





// --------------------
// App Component with Routes
// --------------------
function App() {
  return (
    <Router>
      <ImageCursor />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/book" element={<Book />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* ✅ Admin Route */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// --------------------
// Footer Component
// --------------------
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Payfikar Travels</h3>
            <p>Your trusted partner for ferry services between Mumbai and Mandwa/Alibaug. Fast, reliable, and comfortable travel across the Arabian Sea.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/fleet">Our Fleet</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/book">Book Now</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li><Link to="/book">Passenger Ferries</Link></li>
              <li><Link to="/book">Vehicle Transport</Link></li>
              <li><Link to="/book">Charter Services</Link></li>
              <li><Link to="/explore">Tour Packages</Link></li>
              <li><Link to="/faq">Travel Support</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li>📞 +91 9876543210</li>
              <li>✉️ info@payfikartravels.com</li>
              <li>📍 Plot no 30, abhyudaya nagar colony,vanasthalipuram, Hyderabad,TG-500070</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2026 Payfikar Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
