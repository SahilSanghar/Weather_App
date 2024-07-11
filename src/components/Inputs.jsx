import { Box, Button, Input } from '@mui/material'
import { BiSearch, BiCurrentLocation } from 'react-icons/bi'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Inputs = ({ setQuery, setUnits }) => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if(city !== "") {
            setQuery({ q: city });
        };
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setQuery({ lat: latitude, lon: longitude })
            })
        }
    };

return (
<Box marginY={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
    <Box width={3/4}
        gap={4}
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 'none !important',
            '&:hover': {
                borderBottom: '0px !important'
            },
        }}>

        <FaUserAlt
            size={40}
            cursor='pointer'
            onClick={handleLogin}
        />
        <CiLogout
            size={40}
            cursor='pointer'
            onClick={handleLogout}
        />

        <Input type='text' placeholder='Search By City...'
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        sx={{ 
            height: '65px',
            backgroundColor: 'white',
            color: 'grey.500', 
            fontSize: '1.25rem',
            fontWeight: 300,
            padding: 2,
            width: '100%', 
            borderRadius: '5px',
            textTransform: 'capitalize', 
            '&::placeholder': {
            textTransform: 'lowercase', 
            borderBottom: '0px !important',
            },
            '&:hover': {
                boxShadow: 14,
                borderBottom: '0px !important'
            },
            '&:focus': {
                outline: 'none', 
            },
        }}/>

        <BiSearch 
            size={40}
            cursor='pointer'
            onClick={handleSearchClick}
        />

        <BiCurrentLocation 
            size={40}
            cursor='pointer'
            onClick={handleLocationClick}
        />
        <Box display='flex'>
        <Button 
            sx={{
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: 500, 
                borderRadius: '0.375rem',
                paddingLeft: '10px'
            }}
            onClick={() => setUnits("metric")}>
                &deg;C
        </Button> 
        <Button 
            sx={{
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: 500, 
                borderRadius: '0.375rem',
                paddingLeft: '10px'
            }}
            onClick={() => setUnits("imperial")}>
                &deg;F
        </Button>
        </Box>
    </Box>
</Box>
)
}

export default Inputs