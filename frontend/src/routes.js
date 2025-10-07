import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/common/Home';
import About from './pages/common/About';
import NotFound from './pages/common/NotFound';
import CitizenLogin from './pages/citizen/CitizenLogin';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ReportCrime from './pages/citizen/ReportCrime';
import EmergencySOS from './pages/citizen/EmergencySOS';
import ComplaintStatus from './pages/citizen/ComplaintStatus';
import CitizenProfile from './pages/citizen/CitizenProfile';
import PoliceLogin from './pages/police/PoliceLogin';
import PoliceDashboard from './pages/police/PoliceDashboard';
import ComplaintManagement from './pages/police/ComplaintManagement';
import SOSAlerts from './pages/police/SOSAlerts';
import CaseUpdate from './pages/police/CaseUpdate';
import AnalyticsDashboard from './pages/police/AnalyticsDashboard';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  
  // Citizen Routes
  { path: '/citizen/login', element: <CitizenLogin /> },
  { path: '/citizen/dashboard', element: <CitizenDashboard /> },
  { path: '/citizen/report', element: <ReportCrime /> },
  { path: '/citizen/sos', element: <EmergencySOS /> },
  { path: '/citizen/status', element: <ComplaintStatus /> },
  { path: '/citizen/profile', element: <CitizenProfile /> },
  
  // Police Routes
  { path: '/police/login', element: <PoliceLogin /> },
  { path: '/police/dashboard', element: <PoliceDashboard /> },
  { path: '/police/complaints', element: <ComplaintManagement /> },
  { path: '/police/sos', element: <SOSAlerts /> },
  { path: '/police/case-update', element: <CaseUpdate /> },
  { path: '/police/analytics', element: <AnalyticsDashboard /> },
  
  { path: '*', element: <NotFound /> }
]);

export default router;