import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password },
                { withCredentials: true }
            );
            console.log('Login successful:', response.data);
            toast.success('Logged in successfully');
            navigate('/');
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Server Error:', error.response.data);
                toast.error(error.response.data.message || 'Error logging in');
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Network Error:', error.request);
                toast.error('Network error. Please try again.');
            } else {
                // Something else happened
                console.error('Error:', error.message);
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}>
            <Box
                width="100%"
                maxWidth="400px"
                padding="2rem"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: 3,
                }}>
                <Typography
                    variant="h4"
                    marginBottom="2rem"
                    textAlign="center"
                    color="black"
                    fontWeight="bold">
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                            height: '56px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f0',
                            '&::placeholder': {
                                color: 'grey.500',
                            },
                            '&:hover': {
                                boxShadow: 2,
                                borderBottom: 'none',
                            },
                        }}
                    />
                    <TextField
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        fullWidth
                        sx={{
                            marginBottom: '1.5rem',
                            height: '56px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f0',
                            '&::placeholder': {
                                color: 'grey.500',
                            },
                            '&:hover': {
                                boxShadow: 2,
                            },
                        }}
                    />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        textAlign="center"
                        marginBottom="1rem"
                    >
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                        >
                            Register
                        </Link>
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            height: '50px',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
