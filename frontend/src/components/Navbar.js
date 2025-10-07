import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Cop Friendly App</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        {user ? (
          <>
            {user.role === 'citizen' ? (
              <>
                <Link to="/citizen/dashboard">Dashboard</Link>
                <Link to="/citizen/report">Report Crime</Link>
                <Link to="/citizen/sos">SOS</Link>
                <Link to="/citizen/status">Status</Link>
                <Link to="/citizen/profile">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/police/dashboard">Dashboard</Link>
                <Link to="/police/complaints">Complaints</Link>
                <Link to="/police/sos">SOS Alerts</Link>
                <Link to="/police/analytics">Analytics</Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/citizen/login">Citizen Login</Link>
            <Link to="/police/login">Police Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;