import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import auth from '..';
import { init } from '../features/token/tokenSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // Page Specific State
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    // Redux Global State
    const dispatch = useDispatch();

    // React-Router Navigation
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        callLogin();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            callLogin();
        }
    }

    const callLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const obj = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    accessToken: userCredential.user.stsTokenManager.accessToken,
                    refreshToken: userCredential.user.stsTokenManager.refreshToken,
                    expirationTime: userCredential.user.stsTokenManager.expirationTime,
                }
                dispatch(init(obj));
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            gap='2vh'
            minHeight='100vh'
            onKeyDown={e => handleKeyDown(e)}>
            <Button href='/'>Back</Button>
            <FormControl variant='standard' required={true}>
                <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
                <OutlinedInput
                    id='outlined-adornment-email'
                    sx={{ width: '25ch' }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <AccountCircle edge='end' />
                        </InputAdornment>
                    }
                    onChange={(e) => handleEmailChange(e)}
                    label='Email'
                />
            </FormControl>
            <FormControl variant='standard' required={true}>
                <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                <OutlinedInput
                    id='outlined-adornment-password'
                    sx={{ width: '25ch' }}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(e) => handlePasswordChange(e)}
                    label='Password'
                />
            </FormControl>
            <Button
                variant='outlined'
                disabled={!email || !password}
                onClick={e => handleSubmit(e)}>
                Log In
            </Button>
        </Box>
    );
}

export default LoginPage;
