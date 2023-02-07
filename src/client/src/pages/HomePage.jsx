import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { init, selectEmail } from '../features/token/tokenSlice';

const HomePage = () => {

    // Redux Global State
    const dispatch = useDispatch();

    // React-Router Navigation
    const navigate = useNavigate();

    // Cookie Management
    const [cookies] = useCookies(['access_token', 'refresh_token', 'expiration_time']);
    const email = useSelector(selectEmail);

    // Redirects if there is no active user
    useEffect(() => {
        if (cookies.access_token === null) {
            navigate('/login');
        } else {
            const obj = {
                uid: 0, // Collect uid from db
                email: 'collect', // Collect email from db
                accessToken: cookies.access_token,
                refreshToken: cookies.refresh_token,
                expirationTime: cookies.expiration_time,
            }
            dispatch(init(obj));
        }
    }, [dispatch, navigate, cookies]);

    return (
        <Box>
            <Header />
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                gap='5vh'
                minHeight='75vh'>
                    <Typography variant='h3' component='h3'>Who's joining you?</Typography>
                    <Button variant='outlined' size='large'>Just me</Button>
                    <Typography variant='h6' component='h6'>You currently have no groups. Create or join a group to get started.</Typography>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        gap='5%'>
                            <Button variant='outlined' size='large'>Create Group</Button>
                            <Button variant='outlined' size='large'>Join Group</Button>
                    </Box>
            </Box>
        </Box>
    )
}

export default HomePage;
