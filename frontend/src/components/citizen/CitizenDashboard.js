// frontend/src/components/citizen/CitizenDashboard.js
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
  Paper
} from '@material-ui/core';
import { 
  ReportProblem, 
  GpsFixed, 
  ListAlt, 
  Person,
  Notifications
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const CitizenDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0
  });

  useEffect(() => {
    // Simulate fetching data
    // In a real app, this would be an API call
    setStats({
      totalComplaints: 5,
      pendingComplaints: 2,
      inProgressComplaints: 2,
      resolvedComplaints: 1
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Citizen Dashboard
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
                <Notifications color="info" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.inProgressComplaints}</Typography>
                  <Typography color="text.secondary">In Progress</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Notifications color="success" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.resolvedComplaints}</Typography>
                  <Typography color="text.secondary">Resolved</Typography>
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
                  to="/report-crime"
                  startIcon={<ReportProblem />}
                  sx={{ height: '100%' }}
                >
                  Report Crime
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/sos"
                  startIcon={<GpsFixed />}
                  sx={{ height: '100%' }}
                >
                  Emergency SOS
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/complaint-status"
                  startIcon={<ListAlt />}
                  sx={{ height: '100%' }}
                >
                  Complaint Status
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/citizen-profile"
                  startIcon={<Person />}
                  sx={{ height: '100%' }}
                >
                  My Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Recent Complaints
            </Typography>
            {/* In a real app, this would be populated with data from an API */}
            <Typography variant="body2" color="text.secondary">
              No recent complaints to display.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Crime Prevention Tips
            </Typography>
            <Typography variant="body1" paragraph>
              1. Always be aware of your surroundings, especially in crowded areas.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Keep your valuables secure and out of sight.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Install security cameras and good lighting around your property.
            </Typography>
            <Typography variant="body1" paragraph>
              4. Get to know your neighbors and establish a neighborhood watch.
            </Typography>
            <Typography variant="body1" paragraph>
              5. Report suspicious activities to the police immediately.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CitizenDashboard;