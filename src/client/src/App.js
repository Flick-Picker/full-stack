import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  // React-Router Navigation
  const navigate = useNavigate();

  const handleGoLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleGoSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

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
