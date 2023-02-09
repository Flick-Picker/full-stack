import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  // React-Router Navigation
  const navigate = useNavigate();
  const BACKEND_URI = process.env.REACT_APP_FRONTEND_URI || 'http://localhost:8080';

  const handleGoLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleGoSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  // error check to see if backend is running
  useEffect(() => {
    axios.get(BACKEND_URI)
      .then((res) => { })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });
  }, [BACKEND_URI, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2vh"
      minHeight="100vh">
      <Button
        onClick={handleGoLogin}
        variant="outlined"
        sx={{ width: '25ch ' }}>
        Log In
      </Button>
      <Button
        onClick={handleGoSignup}
        variant="outlined"
        sx={{ width: '25ch ' }}>
        Sign Up
      </Button>
    </Box>
  );
}

export default App;
