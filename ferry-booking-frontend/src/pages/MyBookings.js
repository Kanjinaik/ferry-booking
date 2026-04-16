import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("bookings/my");
      let bookingData = response.data.data;
      console.log('Bookings fetched:', bookingData);
      
      // Apply filter
      if (filter !== 'all') {
        bookingData = bookingData.filter(booking => booking.status === filter);
      }
      
      setBookings(bookingData);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const classes = {
      'confirmed': 'status-confirmed',
      'pending': 'status-pending',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-pending';
  };

  const getStatusText = (status) => {
    const texts = {
      'confirmed': '✅ Confirmed',
      'pending': '⏳ Pending',
      'cancelled': '❌ Cancelled'
    };
    return texts[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await api.delete(`/bookings/${bookingId}`);
      alert('Booking cancelled successfully');
      loadBookings(); // Reload bookings
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="section section-light" style={{minHeight: '100vh', paddingTop: '100px'}}>
      <div className="container">
        <div className="dashboard-header">
          <h1>My Bookings</h1>
          <p>Manage your ferry reservations</p>
        </div>

        {/* Filter Controls */}
        <div className="mb-20" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button 
            className={`btn ${filter === 'all' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button 
            className={`btn ${filter === 'confirmed' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setFilter('confirmed')}
          >
            ✅ Confirmed
          </button>
          <button 
            className={`btn ${filter === 'pending' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setFilter('pending')}
          >
            ⏳ Pending
          </button>
          <button 
            className={`btn ${filter === 'cancelled' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setFilter('cancelled')}
          >
            ❌ Cancelled
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center p-20">
            <h3>No bookings found</h3>
            <p>You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
            <button 
              className="btn mt-20" 
              onClick={() => navigate('/')}
            >
              Book a Ferry
            </button>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-item fade-in">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px'}}>
                  <div>
                    <h3 style={{color: '#007bff', marginBottom: '10px'}}>⛴️ {booking.ferry?.route}</h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px'}}>
                      <div>
                        <strong>📅 Travel Date:</strong><br/>
                        {formatDate(booking.travel_date)}
                      </div>
                      <div>
                        <strong>⏰ Departure:</strong><br/>
                        {formatTime(booking.ferry?.departure_time)}
                      </div>
                      <div>
                        <strong>👥 Passengers:</strong><br/>
                        {booking.passengers} ({booking.adults} adults, {booking.children} children)
                      </div>
                      {booking.vehicle_type !== 'none' && booking.vehicle_count > 0 && (
                        <div>
                          <strong>🚗 Vehicle:</strong><br/>
                          {booking.vehicle_count} {booking.vehicle_type}(s)
                        </div>
                      )}
                      <div>
                        <strong>💰 Total Amount:</strong><br/>
                        <span style={{color: '#28a745', fontWeight: '600'}}>₹{booking.total_amount}</span>
                      </div>
                    </div>
                    {booking.special_requests && (
                      <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
                        <strong>📝 Special Requests:</strong><br/>
                        {booking.special_requests}
                      </div>
                    )}
                  </div>
                  
                  <div style={{textAlign: 'right'}}> 
                    <span className={`booking-status ${getStatusClass(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                    <div style={{marginTop: '15px', fontSize: '0.9rem', color: '#6c757d'}}>
                      Booked on: {formatDate(booking.booking_date)}
                    </div>
                    {booking.status === 'confirmed' && (
                      <button 
                        className="btn btn-danger mt-20" 
                        onClick={() => handleCancelBooking(booking.id)}
                        style={{fontSize: '0.9rem', padding: '8px 15px'}}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
