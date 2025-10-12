// frontend/src/components/police/AnalyticsDashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { 
  TrendingUp, 
  LocationOn, 
  Schedule, 
  ReportProblem,
  Assessment
} from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import { getDashboardStats, getCrimeHotspots } from '../../services/api';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    activeSOS: 0,
    pendingComplaints: 0,
    avgResponseTime: 0
  });
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 19.0760,
    lng: 72.8777
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [statsResponse, hotspotsResponse] = await Promise.all([
          getDashboardStats(),
          getCrimeHotspots(mapCenter.lat, mapCenter.lng)
        ]);
        
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
        
        if (hotspotsResponse.success) {
          setHotspots(hotspotsResponse.data);
        }
      } catch (err) {
        console.error('Failed to fetch analytics data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const Marker = ({ count }) => (
    <div style={{ 
      color: 'red', 
      fontSize: '20px',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <LocationOn fontSize="large" color="error" />
      <span style={{ 
        backgroundColor: 'red', 
        color: 'white', 
        borderRadius: '50%', 
        width: '20px', 
        height: '20px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
        marginTop: '-10px'
      }}>
        {count}
      </span>
    </div>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
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
                <TrendingUp color="info" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.avgResponseTime}h</Typography>
                  <Typography color="text.secondary">Avg. Response</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule color="warning" sx={{ fontSize: 40, mr: 1 }} />
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
                <Assessment color="error" sx={{ fontSize: 40, mr: 1 }} />
                <Box>
                  <Typography variant="h4">{stats.activeSOS}</Typography>
                  <Typography color="text.secondary">Active SOS</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Crime Hotspots
            </Typography>
            <div style={{ height: '350px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                defaultCenter={mapCenter}
                defaultZoom={12}
              >
                {hotspots.map((hotspot, index) => (
                  <Marker
                    key={index}
                    lat={hotspot.coordinates[1]}
                    lng={hotspot.coordinates[0]}
                    count={hotspot.count}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Top Crime Locations
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Crimes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotspots.slice(0, 5).map((hotspot, index) => (
                    <TableRow key={index}>
                      <TableCell>{hotspot.address || `Location ${index + 1}`}</TableCell>
                      <TableCell>{hotspot.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Crime Categories
            </Typography>
            {/* In a real app, this would be a chart */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                Theft: 40%
              </Typography>
              <Typography variant="body1" paragraph>
                Assault: 25%
              </Typography>
              <Typography variant="body1" paragraph>
                Vandalism: 15%
              </Typography>
              <Typography variant="body1" paragraph>
                Domestic Violence: 10%
              </Typography>
              <Typography variant="body1" paragraph>
                Other: 10%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Monthly Trend
            </Typography>
            {/* In a real app, this would be a line chart */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                January: 45 complaints
              </Typography>
              <Typography variant="body1" paragraph>
                February: 52 complaints
              </Typography>
              <Typography variant="body1" paragraph>
                March: 38 complaints
              </Typography>
              <Typography variant="body1" paragraph>
                April: 41 complaints
              </Typography>
              <Typography variant="body1" paragraph>
                May: 35 complaints (current)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsDashboard;