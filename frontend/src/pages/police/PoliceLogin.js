import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { policeLogin } from '../../services/authService';
import Button from '../../components/Button';
import './PoliceLogin.css';

const PoliceLogin = () => {
  const [credentials, setCredentials] = useState({ badge: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await policeLogin(credentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/police/dashboard');
    } catch (err) {
      setError('Invalid badge number or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Police Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Badge Number</label>
            <input
              type="text"
              name="badge"
              value={credentials.badge}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PoliceLogin;