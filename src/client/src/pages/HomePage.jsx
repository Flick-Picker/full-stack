import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogOut from '../components/LogOut';
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
    // ..handle cookies?
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
    }, []);

    return (
        <Box>
            Hi {`${email}`}
            <LogOut />
        </Box>
    )
}

export default HomePage;
