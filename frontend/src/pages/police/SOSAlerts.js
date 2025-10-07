import { useState, useEffect } from 'react';
import { getSOSAlerts } from '../../services/policeService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './SOSAlerts.css';

const SOSAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await getSOSAlerts();
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching SOS alerts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleRespond = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'Responding' } : alert
    ));
  };

  if (loading) return <div className="loading">Loading SOS alerts...</div>;

  return (
    <div className="sos-container">
      <h1>SOS Alerts</h1>
      {alerts.length === 0 ? (
        <div className="no-alerts">
          <p>No active SOS alerts.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => (
            <Card key={alert.id} className="alert-card">
              <div className="alert-header">
                <h3>Alert #{alert.id}</h3>
                <span className={`status-badge ${alert.status.toLowerCase()}`}>
                  {alert.status}
                </span>
              </div>
              <div className="alert-details">
                <p><strong>Location:</strong> {alert.location.lat}, {alert.location.lng}</p>
                <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
              </div>
              <div className="alert-actions">
                {alert.status === 'Active' && (
                  <Button 
                    onClick={() => handleRespond(alert.id)}
                    className="btn-primary"
                  >
                    Mark as Responding
                  </Button>
                )}
                <Button 
                  onClick={() => {
                    window.open(`https://maps.google.com/?q=${alert.location.lat},${alert.location.lng}`, '_blank');
                  }}
                  className="btn-success"
                >
                  View on Map
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SOSAlerts;