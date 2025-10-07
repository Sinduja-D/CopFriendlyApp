import { useState, useEffect } from 'react';
import { getComplaints } from '../../services/citizenService';
import Card from '../../components/Card';
import './ComplaintStatus.css';

const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await getComplaints(user.id);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f39c12';
      case 'In Progress': return '#3498db';
      case 'Closed': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  if (loading) return <div className="loading">Loading complaints...</div>;

  return (
    <div className="status-container">
      <h1>Complaint Status</h1>
      {complaints.length === 0 ? (
        <div className="no-complaints">
          <p>You haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <div className="complaints-list">
          {complaints.map(complaint => (
            <Card key={complaint.id} className="complaint-card">
              <div className="complaint-header">
                <h3>Complaint #{complaint.id}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(complaint.status) }}
                >
                  {complaint.status}
                </span>
              </div>
              <p className="complaint-description">{complaint.description}</p>
              <div className="complaint-details">
                <p><strong>Category:</strong> {complaint.category}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintStatus;