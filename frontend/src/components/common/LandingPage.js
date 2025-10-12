// frontend/src/components/common/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@material-ui/core';

const LandingPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h3" gutterBottom>
            KaavalCircle
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            From Citizen For Citizen With Police
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/citizen-register"
              variant="contained"
              color="primary"
              size="large"
            >
              Citizen
            </Button>
            <Button
              component={Link}
              to="/police-register"
              variant="contained"
              color="secondary"
              size="large"
            >
              Police
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LandingPage;