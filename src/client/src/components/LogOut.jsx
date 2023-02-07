import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '..';
import { remove } from '../features/token/tokenSlice';

const LogOut = (props) => {
    
    // Redux Global State
    const dispatch = useDispatch();

    // React-Router Navigation
    const navigate = useNavigate();

    // Cookie Management
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'expiration_time']);

    const handleLogOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            dispatch(remove());

            removeCookie('access_token');
            removeCookie('refresh_token');
            removeCookie('expiration_time');
            
            navigate('/');
        }).catch((error) => {
            // Uh Oh..
            console.log(error);
        })
    }

    return (
        <Button
            variant='outlined'
            onClick={e => handleLogOut(e)}
            color={props.color}>
            Log Out
        </Button>
    )
}

export default LogOut;