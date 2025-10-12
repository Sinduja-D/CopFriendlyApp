// frontend/src/components/auth/PoliceRegister.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
  MenuItem
} from '@material-ui/core';

const PoliceRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    stationName: '',
    batchNo: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    aadharNo: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const { register } = useContext(AuthContext);

  const { 
    name, 
    stationName, 
    batchNo, 
    email, 
    phone, 
    address, 
    age, 
    aadharNo, 
    gender, 
    password, 
    confirmPassword 
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const result = await register({
      name,
      stationName,
      batchNo,
      email,
      phone,
      address,
      age: parseInt(age),
      aadharNo,
      gender,
      password,
      userType: 'police'
    });

    if (result.success) {
      // Redirect to police dashboard
      window.location.href = '/police-dashboard';
    } else {
      alert(result.message);
    }
  };

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
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Police Registration
          </Typography>
          
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="stationName"
              label="Station Name"
              name="stationName"
              value={stationName}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="batchNo"
              label="Batch Number"
              name="batchNo"
              value={batchNo}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={phone}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              multiline
              rows={2}
              value={address}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="aadharNo"
              label="Aadhar Number"
              name="aadharNo"
              value={aadharNo}
              onChange={onChange}
            />
            
            <FormControl margin="normal" required fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={onChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={onChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
            <Box textAlign="center">
              <Link to="/police-login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Login
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PoliceRegister;