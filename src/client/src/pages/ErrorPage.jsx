import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useRouteError } from 'react-router';

const ErrorPage = () => {
  const {state} = useLocation();
  const routeError = useRouteError()
  const error = state ? state.error : routeError;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2vh"
      minHeight="100vh">
      <Card>
        <CardContent>Error</CardContent>
        <Typography>Sorry, an unexpected error has occured.</Typography>
        <Typography>{error}</Typography>
      </Card>
    </Box>
  );
};

export default ErrorPage;
