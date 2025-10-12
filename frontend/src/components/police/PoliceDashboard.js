// frontend/src/components/police/PoliceDashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import { 
  ReportProblem, 
  GpsFixed, 
  ListAlt, 
  Person,
  Notifications,
  Assessment,
  TrendingUp
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../services/api';

const PoliceDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    activeSOS: 0,
    pendingComplaints: 0,
    avgResponseTime: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
        
        // In a real app, this would be an API call to get recent complaints
        setRecentComplaints([
          {
            _id: '12345678',
            category: 'Theft',
            description: 'Reported theft of bicycle from parking area',
            status: 'Pending',
            createdAt: new Date()
          },
          {
            _id: '87654321',
            category: 'Assault',
            description: 'Physical altercation reported at city center',
            status: 'In Progress',
            createdAt: new Date(Date.now() - 86400000)
          }
        ]);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Police Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ReportProblem color="primary" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.totalComplaints}</Typography>
                  <Typography color="text.secondary">Total Complaints</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GpsFixed color="error" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.activeSOS}</Typography>
                  <Typography color="text.secondary">Active SOS</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Notifications color="warning" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.pendingComplaints}</Typography>
                  <Typography color="text.secondary">Pending</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp color="info" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.avgResponseTime}h</Typography>
                  <Typography color="text.secondary">Avg. Response</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/manage-complaints"
                  startIcon={<ListAlt />}
                  sx={{ height: '100%' }}
                >
                  Manage Complaints
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/sos-alerts"
                  startIcon={<GpsFixed />}
                  sx={{ height: '100%' }}
                >
                  SOS Alerts
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/analytics"
                  startIcon={<Assessment />}
                  sx={{ height: '100%' }}
                >
                  Analytics
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/police-profile"
                  startIcon={<Person />}
                  sx={{ height: '100%' }}
                >
                  My Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Recent Complaints
            </Typography>
            <List>
              {recentComplaints.map((complaint, index) => (
                <React.Fragment key={complaint._id}>
                  <ListItem>
                    <ListItemText
                      primary={`${complaint.category} - ${complaint._id.substring(0, 8)}`}
                      secondary={complaint.description.substring(0, 50) + '...'}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/manage-complaints`}
                    >
                      View
                    </Button>
                  </ListItem>
                  {index < recentComplaints.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Active SOS Alerts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No active SOS alerts at this time.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PoliceDashboard;