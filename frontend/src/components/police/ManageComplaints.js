// frontend/src/components/police/ManageComplaints.js
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
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { getComplaints, updateComplaintStatus } from '../../services/api';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getComplaints();
        if (response.success) {
          setComplaints(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch complaints', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'In Progress':
        return 'info';
      case 'Closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleUpdateStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setDialogOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedComplaint || !newStatus) return;
    
    setUpdating(true);
    
    try {
      const response = await updateComplaintStatus(selectedComplaint._id, newStatus);
      if (response.success) {
        // Update the local state
        setComplaints(complaints.map(c => 
          c._id === selectedComplaint._id ? response.data : c
        ));
        setDialogOpen(false);
      } else {
        alert('Failed to update complaint status');
      }
    } catch (err) {
      alert('Failed to update complaint status');
    }
    
    setUpdating(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Complaints
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : complaints.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No complaints found</Typography>
          <Typography variant="body2" color="text.secondary">
            There are no complaints to manage at this time.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Citizen</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint._id.substring(0, 8)}</TableCell>
                  <TableCell>{complaint.citizenId?.name || 'Unknown'}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>{complaint.description.substring(0, 50)}...</TableCell>
                  <TableCell>{complaint.location?.address || 'Unknown'}</TableCell>
                  <TableCell>{new Date(complaint.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.status} 
                      color={getStatusColor(complaint.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleUpdateStatus(complaint)}
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Complaint Status</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box>
              <Typography variant="body1" paragraph>
                Complaint ID: {selectedComplaint._id}
              </Typography>
              <Typography variant="body1" paragraph>
                Category: {selectedComplaint.category}
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
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

export default ManageComplaints;