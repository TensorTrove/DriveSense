import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';

const CommandForm = () => {
  const [command, setCommand] = useState('');
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);

  const handleCommandSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/command', { command });
      setFeedback(response.data.response);
      setOpen(true);
    } catch (error) {
      console.error('Error sending command:', error);
      setFeedback('Error sending command');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} className="command-section">
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Enter Command
        </Typography>
        <TextField
          label="Command"
          variant="outlined"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCommandSubmit} fullWidth>
          Send Command
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {feedback}
          </Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
};

export default CommandForm;
