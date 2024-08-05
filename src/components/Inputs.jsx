import { Box, Button, Input, IconButton, Drawer } from '@mui/material'
import { BiSearch, BiCurrentLocation, BiMenu } from 'react-icons/bi'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from "react-router-dom";

const Inputs = ({ setQuery, setUnits }) => {
    const [city, setCity] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    const handleSearchClick = () => {
        if(city !== "") {
            setQuery({ q: city });
        };
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setQuery({ lat: latitude, lon: longitude })
            })
        }
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <Box marginY={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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

                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <Link to="/sign-in" style={{ color: 'white' }}>
                            <FaUserAlt size={40} cursor='pointer' />
                        </Link>
                    )}

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
                        }}
                    />

                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <BiSearch size={30} cursor='pointer' style={{ marginTop: '16px' }} onClick={handleSearchClick} />
                        <BiCurrentLocation size={30} cursor='pointer' style={{ marginTop: '16px', marginLeft: '20px' }} onClick={handleLocationClick} />
                        <Button
                            sx={{
                                color: 'white',
                                fontSize: '1.8rem',
                                fontWeight: 500, 
                                borderRadius: '0.375rem',
                                marginLeft: '10px'
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
                            }}
                            onClick={() => setUnits("imperial")}>
                            &deg;F
                        </Button>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <BiMenu size={40} color="white" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ width: 240 }}
            >
                <Box
                    sx={{ width: 240, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    role="presentation"
                >
                    <BiSearch size={40} cursor='pointer' onClick={handleSearchClick} />
                    <BiCurrentLocation size={40} cursor='pointer' onClick={handleLocationClick} />
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
            </Drawer>
        </>
    );
}

export default Inputs;
