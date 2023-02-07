import { Box, Button } from '@mui/material';
import React from 'react';

function App() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap='2vh'
      minHeight='100vh'>
      <Button
        href='/login'
        variant='outlined'
        sx={{ width: '25ch '}}>Log In</Button>
      <Button
        href='/signup'
        variant='outlined'
        sx={{ width: '25ch '}}>Sign Up</Button>
    </Box>
  );
}

export default App;
