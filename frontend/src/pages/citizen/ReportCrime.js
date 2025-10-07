import { useState } from 'react';
import { reportCrime } from '../../services/citizenService';
import Button from '../../components/Button';
import './ReportCrime.css';

const ReportCrime = () => {
  const [crimeData, setCrimeData] = useState({
    description: '',
    category: '',
    location: '',
    evidence: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCrimeData({ ...crimeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCrimeData({ ...crimeData, evidence: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const formData = new FormData();
      formData.append('citizenId', user.id);
      formData.append('description', crimeData.description);
      formData.append('category', crimeData.category);
      formData.append('location', crimeData.location);
      if (crimeData.evidence) {
        formData.append('evidence', crimeData.evidence);
      }
      
      await reportCrime(formData);
      setSuccess(true);
      setCrimeData({
        description: '',
        category: '',
        location: '',
        evidence: null
      });
    } catch (error) {
      console.error('Error reporting crime:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h1>Report Crime</h1>
      {success ? (
        <div className="success-message">
          <h3>Crime Reported Successfully!</h3>
          <p>Your report has been submitted. You can track the status in your dashboard.</p>
          <Button onClick={() => setSuccess(false)} className="btn-primary">Report Another</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Crime Description</label>
            <textarea
              name="description"
              value={crimeData.description}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={crimeData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Theft">Theft</option>
              <option value="Assault">Assault</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Fraud">Fraud</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={crimeData.location}
              onChange={handleChange}
              placeholder="Enter address or location"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Evidence (Image/Video)</label>
            <input
              type="file"
              name="evidence"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
          </div>
          
          <Button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReportCrime;