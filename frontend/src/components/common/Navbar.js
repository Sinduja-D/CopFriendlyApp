// frontend/src/components/common/Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar
} from '@material-ui/core';
import { 
  AccountCircle, 
  Notifications, 
  ExitToApp,
  Home,
  Report,
  GpsFixed,
  ListAlt,
  Assessment,
  Person
} from '@material-ui/icons';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    // Simulate getting notification count
    // In a real app, this would come from an API call
    setNotificationCount(3);
  }, []);

  const isCitizen = user && user.userType === 'citizen';
  const isPolice = user && user.userType === 'police';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KaavalCircle
        </Typography>
        
        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isCitizen && (
              <>
                <Button color="inherit" component={Link} to="/citizen-dashboard" startIcon={<Home />}>
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/report-crime" startIcon={<Report />}>
                  Report Crime
                </Button>
                <Button color="inherit" component={Link} to="/sos" startIcon={<GpsFixed />}>
                  SOS
                </Button>
                <Button color="inherit" component={Link} to="/complaint-status" startIcon={<ListAlt />}>
                  Complaint Status
                </Button>
              </>
            )}
            
            {isPolice && (
              <>
                <Button color="inherit" component={Link} to="/police-dashboard" startIcon={<Home />}>
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/manage-complaints" startIcon={<ListAlt />}>
                  Manage Complaints
                </Button>
                <Button color="inherit" component={Link} to="/sos-alerts" startIcon={<GpsFixed />}>
                  SOS Alerts
                </Button>
                <Button color="inherit" component={Link} to="/analytics" startIcon={<Assessment />}>
                  Analytics
                </Button>
                <IconButton color="inherit">
                  <Badge badgeContent={notificationCount} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </>
            )}
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={user?.name} src={user?.photo} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to={isCitizen ? "/citizen-profile" : "/police-profile"}>
                <Person sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;