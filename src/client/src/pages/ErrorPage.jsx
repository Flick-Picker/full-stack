import { Box, Card, CardContent, Typography } from "@mui/material";
import React from 'react';
import { useRouteError } from "react-router";


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
