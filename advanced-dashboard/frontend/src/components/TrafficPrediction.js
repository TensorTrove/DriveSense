import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';

const TrafficPrediction = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [prediction, setPrediction] = useState('');
  const [open, setOpen] = useState(false);

  const handlePredict = async () => {
    try {
      const response = await axios.post('/predict_traffic', { time_of_day: parseInt(timeOfDay) });
      setPrediction(`Predicted Traffic Density: ${response.data.traffic_density}`);
      setOpen(true);
    } catch (error) {
      console.error('Error predicting traffic:', error);
      setPrediction('Error predicting traffic');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} className="traffic-prediction-section">
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Predict Traffic Density
        </Typography>
        <TextField
          label="Time of Day (hour)"
          variant="outlined"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handlePredict} fullWidth>
          Predict
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {prediction}
          </Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
};

export default TrafficPrediction;
