import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeFerries: 0,
    pendingBookings: 0,
    recentBookings: [],
    ferryPerformance: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simulate API calls - replace with actual API endpoints
      const mockData = {
        totalBookings: 1247,
        totalRevenue: 895000,
        activeFerries: 8,
        pendingBookings: 23,
        recentBookings: [
          { id: 1, customer: 'John Smith', route: 'Mumbai → Mandwa', date: '2024-01-15', amount: 1200, status: 'confirmed' },
          { id: 2, customer: 'Sarah Johnson', route: 'Mandwa → Mumbai', date: '2024-01-15', amount: 800, status: 'pending' },
          { id: 3, customer: 'Mike Davis', route: 'Mumbai → Alibaug', date: '2024-01-14', amount: 1500, status: 'confirmed' },
          { id: 4, customer: 'Emma Wilson', route: 'Alibaug → Mumbai', date: '2024-01-14', amount: 1200, status: 'cancelled' },
          { id: 5, customer: 'Robert Brown', route: 'Mumbai → Mandwa', date: '2024-01-13', amount: 1200, status: 'confirmed' }
        ],
        ferryPerformance: [
          { name: 'M2M-1', trips: 142, occupancy: 87, revenue: 168000 },
          { name: 'M2M-2', trips: 138, occupancy: 92, revenue: 184000 },
          { name: 'M2M-3', trips: 156, occupancy: 78, revenue: 145000 },
          { name: 'M2M-4', trips: 124, occupancy: 85, revenue: 132000 }
        ]
      };

      // Simulate API delay
      setTimeout(() => {
        setDashboardData(mockData);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && <span className={`trend ${trend > 0 ? 'positive' : 'negative'}`}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>}
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      confirmed: { color: '#28a745', text: 'Confirmed' },
      pending: { color: '#ffc107', text: 'Pending' },
      cancelled: { color: '#dc3545', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className="status-badge" style={{ 
        backgroundColor: `${config.color}20`, 
        color: config.color,
        border: `1px solid ${config.color}`
      }}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="btn-refresh" onClick={loadDashboardData}>
            <span className="icon">🔄</span>
            Refresh Data
          </button>
          <Link to="/admin/settings" className="btn-settings">
            <span className="icon">⚙️</span>
            Settings
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <StatCard 
          title="Total Bookings" 
          value={dashboardData.totalBookings} 
          icon="🎫"
          color="#007bff"
          trend={12}
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${dashboardData.totalRevenue.toLocaleString()}`} 
          icon="💰"
          color="#28a745"
          trend={8}
        />
        <StatCard 
          title="Active Ferries" 
          value={dashboardData.activeFerries} 
          icon="⛴️"
          color="#17a2b8"
          trend={0}
        />
        <StatCard 
          title="Pending Bookings" 
          value={dashboardData.pendingBookings} 
          icon="⏳"
          color="#ffc107"
          trend={-5}
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Bookings */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Bookings</h2>
            <Link to="/admin/bookings" className="view-all">View All</Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.customer}</td>
                    <td>{booking.route}</td>
                    <td>{booking.date}</td>
                    <td>₹{booking.amount}</td>
                    <td><StatusBadge status={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ferry Performance */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Ferry Performance</h2>
            <select className="time-filter">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="performance-list">
            {dashboardData.ferryPerformance.map((ferry, index) => (
              <div key={index} className="performance-item">
                <div className="ferry-info">
                  <h3>{ferry.name}</h3>
                  <p>{ferry.trips} trips completed</p>
                </div>
                <div className="ferry-metrics">
                  <div className="metric">
                    <span className="label">Occupancy</span>
                    <span className="value">{ferry.occupancy}%</span>
                  </div>
                  <div className="metric">
                    <span className="label">Revenue</span>
                    <span className="value">₹{ferry.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${ferry.occupancy}%`, backgroundColor: ferry.occupancy > 80 ? '#28a745' : ferry.occupancy > 60 ? '#ffc107' : '#dc3545' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/admin/ferries" className="action-card">
              <span className="action-icon">⛴️</span>
              <span className="action-text">Manage Ferries</span>
            </Link>
            <Link to="/admin/schedules" className="action-card">
              <span className="action-icon">📅</span>
              <span className="action-text">Schedule Management</span>
            </Link>
            <Link to="/admin/users" className="action-card">
              <span className="action-icon">👥</span>
              <span className="action-text">User Management</span>
            </Link>
            <Link to="/admin/reports" className="action-card">
              <span className="action-icon">📊</span>
              <span className="action-text">Generate Reports</span>
            </Link>
            <Link to="/admin/notifications" className="action-card">
              <span className="action-icon">🔔</span>
              <span className="action-text">Send Notifications</span>
            </Link>
            <Link to="/admin/maintenance" className="action-card">
              <span className="action-icon">🔧</span>
              <span className="action-text">Maintenance</span>
            </Link>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
            <select className="time-filter">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-container">
              <div className="chart-bars">
                {[65, 80, 70, 90, 75, 85, 95].map((height, index) => (
                  <div key={index} className="chart-bar" style={{ height: `${height}%` }}>
                    <span className="bar-value">₹{height * 1000}</span>
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <span key={index} className="chart-label">{day}</span>
                ))}
              </div>
            </div>
            <div className="chart-summary">
              <div className="summary-item">
                <span className="summary-label">This Week</span>
                <span className="summary-value">₹89,500</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Last Week</span>
                <span className="summary-value">₹78,200</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Growth</span>
                <span className="summary-value positive">+14.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;