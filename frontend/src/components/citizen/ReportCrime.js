// frontend/src/components/citizen/ReportCrime.js
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import { LocationOn, AttachFile } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import { createComplaint } from '../../services/api';

const ReportCrime = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    location: {
      latitude: 0,
      longitude: 0,
      address: ''
    },
    evidence: []
  });
  
  const [mapCenter, setMapCenter] = useState({
    lat: 19.0760,
    lng: 72.8777
  });
  
  const [mapZoom, setMapZoom] = useState(11);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { description, category, location, evidence } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const onMapClick = ({ x, y, lat, lng, event }) => {
    setSelectedLocation({ lat, lng });
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        latitude: lat,
        longitude: lng
      }
    });
  };

  const onAddressChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        address: e.target.value
      }
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }
    
    if (!location.address) {
      alert('Please enter the address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await createComplaint(formData);
      
      if (result.success) {
        alert('Complaint submitted successfully');
        // Download PDF
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${result.pdf}`;
        link.download = `complaint-${result.data._id}.pdf`;
        link.click();
        
        // Reset form
        setFormData({
          description: '',
          category: '',
          location: {
            latitude: 0,
            longitude: 0,
            address: ''
          },
          evidence: []
        });
        setSelectedLocation(null);
      } else {
        alert(result.message || 'Failed to submit complaint');
      }
    } catch (err) {
      alert('Failed to submit complaint');
    }
    
    setIsSubmitting(false);
  };

  const handleEvidenceUpload = (e) => {
    // In a real app, this would handle file uploads
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      evidence: files.map(file => file.name)
    });
  };

  const Marker = ({ text }) => (
    <div style={{ 
      color: 'red', 
      fontSize: '20px',
      transform: 'translate(-50%, -50%)'
    }}>
      <LocationOn fontSize="large" />
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Report Crime
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box component="form" onSubmit={onSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Crime Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={category}
                  onChange={onCategoryChange}
                  required
                >
                  <MenuItem value="Theft">Theft</MenuItem>
                  <MenuItem value="Assault">Assault</MenuItem>
                  <MenuItem value="Vandalism">Vandalism</MenuItem>
                  <MenuItem value="Domestic Violence">Domestic Violence</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Crime Description"
                name="description"
                multiline
                rows={4}
                value={description}
                onChange={onChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Location Address"
                name="address"
                value={location.address}
                onChange={onAddressChange}
              />
              
              <Box margin="normal">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AttachFile />}
                  fullWidth
                >
                  Upload Evidence
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleEvidenceUpload}
                  />
                </Button>
                {evidence.length > 0 && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {evidence.length} file(s) selected
                  </Typography>
                )}
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Crime Location
              </Typography>
              <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                  defaultCenter={mapCenter}
                  defaultZoom={mapZoom}
                  onClick={onMapClick}
                >
                  {selectedLocation && (
                    <Marker
                      lat={selectedLocation.lat}
                      lng={selectedLocation.lng}
                    />
                  )}
                </GoogleMapReact>
              </div>
              {selectedLocation && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportCrime;