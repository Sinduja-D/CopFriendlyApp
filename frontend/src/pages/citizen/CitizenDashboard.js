import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import './CitizenDashboard.css';

const CitizenDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Citizen Dashboard</h1>
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <h3>Report Crime</h3>
          <p>Report a crime or incident with details and evidence</p>
          <Link to="/citizen/report" className="btn btn-primary">Report Now</Link>
        </Card>
        
        <Card className="dashboard-card">
          <h3>Emergency SOS</h3>
          <p>Send immediate emergency alert with your location</p>
          <Link to="/citizen/sos" className="btn btn-danger">Send SOS</Link>
        </Card>
        
        <Card className="dashboard-card">
          <h3>Complaint Status</h3>
          <p>Check the status of your reported complaints</p>
          <Link to="/citizen/status" className="btn btn-primary">View Status</Link>
        </Card>
        
        <Card className="dashboard-card">
          <h3>My Profile</h3>
          <p>Update your personal information</p>
          <Link to="/citizen/profile" className="btn btn-primary">Edit Profile</Link>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;