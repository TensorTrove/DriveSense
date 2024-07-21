import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [destination, setDestination] = useState('');

  const handleAddressSubmit = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      );
      const destPosition = [response.data[0].lat, response.data[0].lon];
      setPosition(destPosition);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <Paper elevation={3} className="map-container">
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Enter Destination Address
        </Typography>
        <TextField
          label="Address"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddressSubmit} fullWidth>
          Show Route
        </Button>
      </Box>
      <MapContainer center={position} zoom={13} style={{ height: '400px', marginTop: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Destination</Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default MapComponent;
