// frontend/src/components/citizen/SOSButton.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@material-ui/core';
import { GpsFixed, Warning } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import { createSOSAlert } from '../../services/api';

const SOSButton = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendSOS = async () => {
    if (!location) {
      setError('Location not available. Please enable location services.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createSOSAlert({
        latitude: location.lat,
        longitude: location.lng,
        address: 'Current Location' // In a real app, this would be reverse geocoded
      });

      if (result.success) {
        alert('SOS alert sent successfully! Help is on the way.');
        handleClose();
      } else {
        setError(result.message || 'Failed to send SOS alert');
      }
    } catch (err) {
      setError('Failed to send SOS alert');
    }

    setLoading(false);
  };

  const Marker = () => (
    <div style={{ 
      color: 'red', 
      fontSize: '20px',
      transform: 'translate(-50%, -50%)'
    }}>
      <Warning fontSize="large" color="error" />
    </div>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Emergency SOS
      </Typography>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Press the SOS button in case of emergency
        </Typography>
        
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<GpsFixed />}
          onClick={handleClickOpen}
          sx={{ 
            mt: 2, 
            p: 2,
            backgroundColor: '#f44336',
            '&:hover': {
              backgroundColor: '#d32f2f',
            }
          }}
        >
          SEND SOS ALERT
        </Button>
        
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
      
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning color="error" sx={{ mr: 1 }} />
            Confirm SOS Alert
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to send an SOS alert? This will notify nearby police officers with your current location.
          </Typography>
          
          {location && (
            <div style={{ height: '300px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                defaultCenter={location}
                defaultZoom={15}
              >
                <Marker lat={location.lat} lng={location.lng} />
              </GoogleMapReact>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSendSOS} 
            color="primary"
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'Send SOS Alert'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SOSButton;