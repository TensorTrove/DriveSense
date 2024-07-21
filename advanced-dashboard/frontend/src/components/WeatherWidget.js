import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardHeader } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ description: 'Sunny', temperature: 25, icon: '' });

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`
        );
        const data = response.data;
        setWeather({
          description: data.weather[0].description,
          temperature: data.main.temp,
          icon: data.weather[0].icon,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Error detecting location:', error);
            fetchWeather(37.7749, -122.4194); // Default to San Francisco if location detection fails
          }
        );
      } else {
        fetchWeather(37.7749, -122.4194); // Default to San Francisco if geolocation is not supported
      }
    };

    detectLocation();
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
