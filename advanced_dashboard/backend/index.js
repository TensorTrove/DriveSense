const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://car-dashboard-ivory.vercel.app'], 
  credentials: true, 
}));

const apiKey = process.env.W_API;

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Bhubaneshwar';
    const country = req.query.country || 'IN';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      temperature: Math.round(data.main.temp - 273),
      condition: data.weather[0].main,
    };

    res.json(weather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});