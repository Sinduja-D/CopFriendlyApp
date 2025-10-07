import { useState } from 'react';
import { sendSOS } from '../../services/citizenService';
import Button from '../../components/Button';
import './EmergencySOS.css';

const EmergencySOS = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          await sendSOS(location);
          setSent(true);
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    } catch (error) {
      console.error('Error sending SOS:', error);
      alert('Failed to send SOS. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sos-container">
      <h1>Emergency SOS</h1>
      {sent ? (
        <div className="sos-sent">
          <h3>SOS Alert Sent!</h3>
          <p>Help is on the way. Your location has been shared with emergency services.</p>
          <Button onClick={() => setSent(false)} className="btn-primary">Send Another SOS</Button>
        </div>
      ) : (
        <div className="sos-content">
          <p>Press the SOS button below to send an emergency alert with your current location</p>
          <Button 
            onClick={handleSOS} 
            disabled={loading} 
            className={`btn-danger sos-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Sending...' : 'SOS'}
          </Button>
          <p className="sos-warning">
            <strong>Warning:</strong> Only use this in real emergencies. False reports may result in penalties.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencySOS;