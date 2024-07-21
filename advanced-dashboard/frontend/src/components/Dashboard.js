import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';
import CommandForm from './CommandForm';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  CssBaseline,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Speed as SpeedIcon,
  WbSunny as WbSunnyIcon,
  DirectionsCar as DirectionsCarIcon,
  Home as HomeIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import './Dashboard.css';

const Dashboard = () => {
  const [speed, setSpeed] = useState(60);
  const [route, setRoute] = useState('Home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const updateDashboard = () => {
      setSpeed((prevSpeed) => {
        const newSpeed = prevSpeed + 5;
        setRoute(newSpeed % 2 === 0 ? 'Home' : 'Work');
        return newSpeed;
      });
    };

    const interval = setInterval(updateDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dynamic Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <List>
            <ListSubheader>Dashboard Sections</ListSubheader>
            <ListItem button>
              <ListItemIcon><SpeedIcon /></ListItemIcon>
              <ListItemText primary="Speed" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WbSunnyIcon /></ListItemIcon>
              <ListItemText primary="Weather" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Route" />
            </ListItem>
            <Divider />
            <ListSubheader>Routes</ListSubheader>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Work" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box mt={4}>
        <Paper elevation={3} className="dashboard">
          <Typography variant="h4" gutterBottom>
            Dynamic Dashboard
          </Typography>
          <Divider />
          <Grid container spacing={4} className="dashboard-info">
            <Grid item xs={12} sm={4}>
              <Card className="dashboard-card" elevation={3}>
                <CardHeader
                  avatar={<SpeedIcon fontSize="large" color="primary" />}
                  title="Speed"
                  titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent>
                  <Typography variant="h5" color="textPrimary">
                    {speed} km/h
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <WeatherWidget />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className="dashboard-card" elevation={3}>
                <CardHeader
                  avatar={<DirectionsCarIcon fontSize="large" color="primary" />}
                  title="Route"
                  titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent>
                  <Typography variant="h5" color="textPrimary">
                    {route}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={4}>
            <CommandForm />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
