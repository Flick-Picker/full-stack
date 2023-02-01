import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove, selectAccessToken, selectEmail } from '../features/token/tokenSlice';

const HomePage = () => {

    // Redux Global State
    const dispatch = useDispatch();

    // React-Router Navigation
    const navigate = useNavigate();

    const accessToken = useSelector(selectAccessToken);
    const email = useSelector(selectEmail);

    // if (accessToken === null) {
    //     navigate('/login');
    // }

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(remove());
        navigate('/');
    }

    return (
        <Box>
            Hi {`${email}`}
            <Button
                variant='outlined'
                onClick={e => handleLogOut(e)}>
                Log Out
            </Button>
        </Box>
    )
}

export default HomePage;
