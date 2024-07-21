import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
