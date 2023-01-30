import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from '@mui/material';
import { useRouteError } from "react-router"


const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);
    
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            gap='2vh'
            minHeight='100vh'>
                <Card>
                    <CardContent>Error</CardContent>
                    <Typography>Sorry, an unexpected error has occured.</Typography>
                    <Typography>{error.statusText || error.message}</Typography>
                </Card>
        </Box>
    )
}

export default ErrorPage;