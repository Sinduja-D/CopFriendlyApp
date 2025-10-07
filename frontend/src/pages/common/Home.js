import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Cop Friendly App</h1>
        <p>Bridging the gap between citizens and law enforcement</p>
        <div className="cta-buttons">
          <Link to="/citizen/login" className="btn btn-primary">Citizen Portal</Link>
          <Link to="/police/login" className="btn btn-danger">Police Portal</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Report Crimes</h3>
          <p>Quickly report incidents with evidence and location details</p>
        </div>
        <div className="feature">
          <h3>Emergency SOS</h3>
          <p>Send immediate alerts with your location in emergencies</p>
        </div>
        <div className="feature">
          <h3>Track Status</h3>
          <p>Monitor the progress of your complaints in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default Home;