import { useState, useEffect } from 'react';
import { getAnalytics } from '../../services/policeService';
import Card from '../../components/Card';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="analytics-container">
      <h1>Analytics Dashboard</h1>
      <div className="analytics-grid">
        <Card className="stat-card">
          <h3>Total Cases</h3>
          <p className="stat-value">{analytics.totalCases}</p>
        </Card>
        
        <Card className="stat-card">
          <h3>Average Response Time</h3>
          <p className="stat-value">{analytics.responseTime}</p>
        </Card>
      </div>
      
      <Card className="chart-card">
        <h3>Crime Hotspots</h3>
        <div className="hotspots-list">
          {analytics.crimeHotspots.map((spot, index) => (
            <div key={index} className="hotspot-item">
              <div className="hotspot-name">{spot.area}</div>
              <div className="hotspot-bar">
                <div 
                  className="hotspot-fill" 
                  style={{ width: `${(spot.incidents / 20) * 100}%` }}
                ></div>
              </div>
              <div className="hotspot-count">{spot.incidents} incidents</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;