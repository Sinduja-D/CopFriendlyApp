import { useState, useEffect } from 'react';
import { getComplaints, updateComplaint } from '../../services/policeService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './ComplaintManagement.css';

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getComplaints();
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaint(id, newStatus);
      setComplaints(complaints.map(complaint => 
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      ));
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

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
    <div className="complaints-container">
      <h1>Complaint Management</h1>
      {complaints.length === 0 ? (
        <div className="no-complaints">
          <p>No complaints found.</p>
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
              <div className="complaint-actions">
                {complaint.status === 'Pending' && (
                  <Button 
                    onClick={() => handleStatusChange(complaint.id, 'In Progress')}
                    className="btn-primary"
                  >
                    Accept
                  </Button>
                )}
                {complaint.status === 'In Progress' && (
                  <Button 
                    onClick={() => handleStatusChange(complaint.id, 'Closed')}
                    className="btn-success"
                  >
                    Close Case
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintManagement;