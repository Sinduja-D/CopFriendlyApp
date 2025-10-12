// frontend/src/components/police/CaseUpdates.js
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
  DialogActions,
  TextField
} from '@material-ui/core';
import { getComplaints, updateComplaintStatus } from '../../services/api';

const CaseUpdates = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
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

  const handleUpdateCase = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setNotes('');
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
        alert('Failed to update case status');
      }
    } catch (err) {
      alert('Failed to update case status');
    }
    
    setUpdating(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Case Updates
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : complaints.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No cases found</Typography>
          <Typography variant="body2" color="text.secondary">
            There are no cases to update at this time.
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
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Updated</TableCell>
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
                  <TableCell>{complaint.assignedTo?.name || 'Unassigned'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.status} 
                      color={getStatusColor(complaint.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{new Date(complaint.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdateCase(complaint)}
                    >
                      Update Case
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Case</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box>
              <Typography variant="body1" paragraph>
                Case ID: {selectedComplaint._id}
              </Typography>
              <Typography variant="body1" paragraph>
                Category: {selectedComplaint.category}
              </Typography>
              <Typography variant="body1" paragraph>
                Description: {selectedComplaint.description}
              </Typography>
              
              <Box sx={{ minWidth: 120, mt: 2, mb: 2 }}>
                <Typography variant="body1">Update Status:</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button
                    variant={newStatus === 'Pending' ? 'contained' : 'outlined'}
                    color="warning"
                    onClick={() => setNewStatus('Pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={newStatus === 'In Progress' ? 'contained' : 'outlined'}
                    color="info"
                    onClick={() => setNewStatus('In Progress')}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={newStatus === 'Closed' ? 'contained' : 'outlined'}
                    color="success"
                    onClick={() => setNewStatus('Closed')}
                  >
                    Closed
                  </Button>
                </Box>
              </Box>
              
              <TextField
                label="Case Notes"
                multiline
                rows={4}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                margin="normal"
              />
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
            {updating ? <CircularProgress size={24} /> : 'Update Case'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CaseUpdates;