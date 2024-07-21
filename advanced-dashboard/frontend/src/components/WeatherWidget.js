import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardHeader } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ description: 'Sunny', temperature: 25, icon: '' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8080/weather?city=San Francisco');
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Card className="dashboard-card" elevation={3}>
      <CardHeader
        avatar={<WbSunnyIcon fontSize="large" color="primary" />}
        title="Weather"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Box display="flex" alignItems="center">
          <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />
          <Box ml={2}>
            <Typography variant="h5" color="textPrimary">
              {weather.description} ({weather.temperature}°C)
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
