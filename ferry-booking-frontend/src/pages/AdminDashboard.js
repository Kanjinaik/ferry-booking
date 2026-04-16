import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [ferries, setFerries] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, ferriesRes] = await Promise.all([
        api.get("/admin/statistics"),
        api.get("/admin/bookings"),
        api.get("/admin/ferries")
      ]);
      
      setStats(statsRes.data.data);
      setBookings(bookingsRes.data.data);
      setFerries(ferriesRes.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert('Access denied. Admin privileges required.');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert('Booking status updated successfully');
      loadDashboardData(); // Refresh data
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'badge-warning',
      'confirmed': 'badge-success',
      'cancelled': 'badge-danger'
    };
    return badges[status] || 'badge-secondary';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="section" style={{minHeight: '100vh', paddingTop: '100px', backgroundColor: '#f8f9fa'}}>
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your ferry booking system</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-20" style={{display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '2px solid #dee2e6', paddingBottom: '15px'}}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`btn ${activeTab === 'bookings' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setActiveTab('bookings')}
          >
            📦 Bookings
          </button>
          <button 
            className={`btn ${activeTab === 'ferries' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setActiveTab('ferries')}
          >
            ⛴️ Ferries
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Statistics Cards */}
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">{stats.users || 0}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.ferries || 0}</div>
                <div className="stat-label">Active Ferries</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.bookings || 0}</div>
                <div className="stat-label">Total Bookings</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{color: '#28a745'}}>₹{stats.total_revenue?.toLocaleString() || 0}</div>
                <div className="stat-label">Total Revenue</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="admin-stats" style={{marginTop: '30px'}}>
              <div className="stat-card">
                <div className="stat-number" style={{color: '#007bff'}}>{stats.confirmed_bookings || 0}</div>
                <div className="stat-label">Confirmed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{color: '#ffc107'}}>{stats.pending_bookings || 0}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{color: '#dc3545'}}>{stats.cancelled_bookings || 0}</div>
                <div className="stat-label">Cancelled</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{color: '#17a2b8'}}>{stats.todays_bookings || 0}</div>
                <div className="stat-label">Today's Bookings</div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="mt-20">
              <h3>Recent Bookings</h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Ferry Route</th>
                      <th>Passengers</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.user?.name}</td>
                        <td>{booking.ferry?.route}</td>
                        <td>{booking.passengers}</td>
                        <td>₹{booking.total_amount}</td>
                        <td><span className={`badge ${getStatusBadge(booking.status)}`}>{booking.status}</span></td>
                        <td>{formatDate(booking.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h3>All Bookings</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Ferry</th>
                    <th>Passengers</th>
                    <th>Vehicle</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Travel Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.user?.name}</td>
                      <td>{booking.ferry?.route}</td>
                      <td>{booking.passengers}</td>
                      <td>{booking.vehicle_count > 0 ? `${booking.vehicle_count} ${booking.vehicle_type}` : 'None'}</td>
                      <td>₹{booking.total_amount}</td>
                      <td>
                        <select 
                          value={booking.status} 
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="badge"
                          style={{border: 'none', background: 'transparent', padding: 0}}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{formatDate(booking.travel_date)}</td>
                      <td>
                        <button className="btn btn-sm btn-secondary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ferries Tab */}
        {activeTab === 'ferries' && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3>Ferry Management</h3>
              <button className="btn">➕ Add New Ferry</button>
            </div>
            
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Seats</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ferries.map(ferry => (
                    <tr key={ferry.id}>
                      <td>{ferry.route}</td>
                      <td>{ferry.departure_time}</td>
                      <td>{ferry.arrival_time}</td>
                      <td>{ferry.seats}</td>
                      <td>₹{ferry.price}</td>
                      <td><span className={`badge ${ferry.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>{ferry.status}</span></td>
                      <td>
                        <button className="btn btn-sm btn-secondary" style={{marginRight: '10px'}}>Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;