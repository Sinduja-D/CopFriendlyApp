import { useState, useEffect } from 'react';
import { getComplaints, getSOSAlerts } from '../../services/policeService';
import Card from '../../components/Card';
import './PoliceDashboard.css';

const PoliceDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    activeSOS: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsResponse = await getComplaints();
        const sosResponse = await getSOSAlerts();
        
        const complaints = complaintsResponse.data;
        const sosAlerts = sosResponse.data;
        
        setStats({
          totalComplaints: complaints.length,
          pendingComplaints: complaints.filter(c => c.status === 'Pending').length,
          activeSOS: sosAlerts.filter(s => s.status === 'Active').length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Police Dashboard</h1>
      <div className="stats-grid">
        <Card className="stat-card">
          <h3>Total Complaints</h3>
          <p className="stat-value">{stats.totalComplaints}</p>
        </Card>
        
        <Card className="stat-card">
          <h3>Pending Complaints</h3>
          <p className="stat-value">{stats.pendingComplaints}</p>
        </Card>
        
        <Card className="stat-card">
          <h3>Active SOS Alerts</h3>
          <p className="stat-value">{stats.activeSOS}</p>
        </Card>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Card className="action-card">
            <h3>Manage Complaints</h3>
            <p>View and respond to citizen complaints</p>
            <a href="/police/complaints" className="btn btn-primary">Go to Complaints</a>
          </Card>
          
          <Card className="action-card">
            <h3>SOS Alerts</h3>
            <p>Respond to emergency alerts</p>
            <a href="/police/sos" className="btn btn-danger">View SOS Alerts</a>
          </Card>
          
          <Card className="action-card">
            <h3>Case Updates</h3>
            <p>Update case statuses</p>
            <a href="/police/case-update" className="btn btn-primary">Update Cases</a>
          </Card>
          
          <Card className="action-card">
            <h3>Analytics</h3>
            <p>View crime statistics and trends</p>
            <a href="/police/analytics" className="btn btn-primary">View Analytics</a>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;