import { useState, useEffect } from 'react';
import { getComplaints, updateCaseStatus } from '../../services/policeService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './CaseUpdate.css';

const CaseUpdate = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedCase, setSelectedCase] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      await updateCaseStatus(selectedCase, newStatus);
      setSuccess(true);
      // Update local state
      setComplaints(complaints.map(complaint => 
        complaint.id === parseInt(selectedCase) 
          ? { ...complaint, status: newStatus } 
          : complaint
      ));
      setSelectedCase('');
      setNewStatus('');
    } catch (error) {
      console.error('Error updating case:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="loading">Loading cases...</div>;

  return (
    <div className="case-update-container">
      <h1>Case Update</h1>
      {success ? (
        <div className="success-message">
          <h3>Case Updated Successfully!</h3>
          <Button onClick={() => setSuccess(false)} className="btn-primary">Update Another Case</Button>
        </div>
      ) : (
        <div className="update-form">
          <Card>
            <h2>Update Case Status</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Case</label>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  required
                >
                  <option value="">Choose a case</option>
                  {complaints.map(complaint => (
                    <option key={complaint.id} value={complaint.id}>
                      Case #{complaint.id} - {complaint.description.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <Button 
                type="submit" 
                disabled={updating || !selectedCase || !newStatus} 
                className="btn-primary"
              >
                {updating ? 'Updating...' : 'Update Case'}
              </Button>
            </form>
          </Card>
          
          <Card>
            <h2>Current Cases</h2>
            <div className="cases-list">
              {complaints.map(complaint => (
                <div key={complaint.id} className="case-item">
                  <div>
                    <strong>Case #{complaint.id}</strong>
                    <p>{complaint.description}</p>
                  </div>
                  <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                    {complaint.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CaseUpdate;