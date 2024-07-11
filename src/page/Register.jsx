import React, { useState } from 'react';
import axios from 'axios'; 
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/register',
                {   
                    email, 
                    password
                },
                { withCredentials: true } // Send cookies with the request
            );

            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }  catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
            toast.error('Registration failed. Please try again.');
        }
    };

return (
    <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
        sx={{ backgroundColor: '#f5f5f5' }}
    >
    <Box 
        width="100%" 
        maxWidth="400px" 
        padding="2rem" 
        sx={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            boxShadow: 3 
        }}>
        <Typography 
            variant="h4" 
            marginBottom="2rem" 
            textAlign="center"
            color='black'
            fontWeight='bold'
        >
            Register
        </Typography>
        <form onSubmit={handleRegister}>
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
                }
            }}
        />
        <Typography 
            variant="body2" 
            color="textSecondary" 
            textAlign="center" 
            marginBottom="1rem"
        >
            Already have an account? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Login</Link>
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
                }
            }}
        >
            Register
        </Button>
        </form>
    </Box>
</Box>
);
};

export default Register;
