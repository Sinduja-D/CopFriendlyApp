// frontend/src/components/police/SOSAlerts.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { GpsFixed, CheckCircle, Map } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import { getSOSAlerts, updateSOSStatus } from '../../services/api';

const SOSAlerts = () => {
  const [sosAlerts, setSOSAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchSOSAlerts = async () => {
      try {
        const response = await getSOSAlerts();
        if (response.success) {
          setSOSAlerts(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch SOS alerts', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSOSAlerts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'error';
      case 'Responding':
        return 'warning';
      case 'Resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleViewMap = (alert) => {
    setSelectedAlert(alert);
    setMapDialogOpen(true);
  };

  const handleUpdateStatus = (alert) => {
    setSelectedAlert(alert);
    setNewStatus(alert.status);
    setStatusDialogOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedAlert || !newStatus) return;
    
    setUpdating(true);
    
    try {
      const response = await updateSOSStatus(selectedAlert._id, newStatus);
      if (response.success) {
        // Update the local state
        setSOSAlerts(sosAlerts.map(a => 
          a._id === selectedAlert._id ? response.data : a
        ));
        setStatusDialogOpen(false);
      } else {
        alert('Failed to update SOS status');
      }
    } catch (err) {
      alert('Failed to update SOS status');
    }
    
    setUpdating(false);
  };

  const handleCloseMapDialog = () => {
    setMapDialogOpen(false);
  };

  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
  };

  const Marker = () => (
    <div style={{ 
      color: 'red', 
      fontSize: '20px',
      transform: 'translate(-50%, -50%)'
    }}>
      <GpsFixed fontSize="large" color="error" />
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        SOS Alerts
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : sosAlerts.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No SOS alerts</Typography>
          <Typography variant="body2" color="text.secondary">
            There are no active SOS alerts at this time.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Citizen</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sosAlerts.map((alert) => (
                <TableRow key={alert._id}>
                  <TableCell>{alert._id.substring(0, 8)}</TableCell>
                  <TableCell>{alert.citizenId?.name || 'Unknown'}</TableCell>
                  <TableCell>{alert.location?.address || 'Unknown'}</TableCell>
                  <TableCell>{new Date(alert.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={alert.status} 
                      color={getStatusColor(alert.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Map />}
                      onClick={() => handleViewMap(alert)}
                      sx={{ mr: 1 }}
                    >
                      View Map
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => handleUpdateStatus(alert)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Map Dialog */}
      <Dialog
        open={mapDialogOpen}
        onClose={handleCloseMapDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>SOS Location</DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <div style={{ height: '400px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                defaultCenter={{
                  lat: selectedAlert.location.coordinates[1],
                  lng: selectedAlert.location.coordinates[0]
                }}
                defaultZoom={15}
              >
                <Marker 
                  lat={selectedAlert.location.coordinates[1]} 
                  lng={selectedAlert.location.coordinates[0]} 
                />
              </GoogleMapReact>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMapDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={handleCloseStatusDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update SOS Status</DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Box>
              <Typography variant="body1" paragraph>
                Alert ID: {selectedAlert._id}
              </Typography>
              <Typography variant="body1" paragraph>
                Citizen: {selectedAlert.citizenId?.name || 'Unknown'}
              </Typography>
              <Typography variant="body1" paragraph>
                Location: {selectedAlert.location?.address || 'Unknown'}
              </Typography>
              
              <Box sx={{ minWidth: 120 }}>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Responding">Responding</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmUpdate} 
            color="primary"
            disabled={updating}
            variant="contained"
          >
            {updating ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SOSAlerts;