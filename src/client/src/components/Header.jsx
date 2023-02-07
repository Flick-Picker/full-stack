import { AccountCircle, Build, Group, Home } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }} >
                        <Box
                            display='flex'
                            alignItems='center'
                            flexWrap='wrap'>
                            <Home />
                            <Typography variant='body1' sx={{ ml: 0.5 }}>Home</Typography>
                        </Box>
                </IconButton>
                <Box sx={{ flexGrow: 1 }} /> {/* Replace here with typography if text needed*/}
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }} >
                        <Box
                            display='flex'
                            alignItems='center'
                            flexWrap='wrap'>
                            <Typography variant='body1' sx={{ mr: 0.5 }}>Preferences</Typography>
                            <Build />
                        </Box>
                </IconButton>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }} >
                        <Box
                            display='flex'
                            alignItems='center'
                            flexWrap='wrap'>
                            <Typography variant='body1' sx={{ mr: 0.5 }}>Social</Typography>
                            <Group />
                        </Box>
                </IconButton>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }} >
                        <Box
                            display='flex'
                            alignItems='center'
                            flexWrap='wrap'>
                            <Typography variant='body1' sx={{ mr: 0.5 }}>Account</Typography>
                            <AccountCircle />
                        </Box>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
