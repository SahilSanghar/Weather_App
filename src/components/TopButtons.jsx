import { Box, Button, Input, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { IoMdAdd, IoMdMenu } from "react-icons/io";
import useMediaQuery from '@mui/material/useMediaQuery';

const TopButtons = ({ setQuery }) => {
    const [cityInput, setCityInput] = useState("");
    const [cities, setCities] = useState([
        { id: 1, name: 'London' },
        { id: 2, name: 'Sydney' },
        { id: 3, name: 'Tokyo' },
        { id: 4, name: 'Paris' },
        { id: 5, name: 'Toronto' }
    ]);
    const [menuOpen, setMenuOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleAddCity = () => {
        if (cityInput.trim() !== "") {
            const newCity = { id: Date.now(), name: cityInput };
            if (cities.length === 5) {
                const newCities = [...cities.slice(1), newCity];
                setCities(newCities);
            } else {
                setCities([...cities, newCity]);
            }
            setCityInput(""); // Clear input field after adding city
        }
    };

    const toggleDrawer = (open) => () => {
        setMenuOpen(open);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
            {isMobile ? (
                <>
                    <IconButton onClick={toggleDrawer(true)}>
                        <IoMdMenu size={30} color="white" />
                    </IconButton>
                    <Drawer anchor='left' open={menuOpen} onClose={toggleDrawer(false)}>
                        <List>
                            {cities.map((city) => (
                                <ListItem button key={city.id} onClick={() => { setQuery({ q: city.name }); setMenuOpen(false); }}>
                                    <ListItemText primary={city.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </>
            ) : (
                cities.map((city) => (
                    <Button
                        key={city.id}
                        sx={{
                            color: 'white',
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            paddingX: 3,
                            paddingY: 1,
                            textTransform: 'none',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.2s ease-in',
                            '&:hover': {
                                backgroundColor: 'rgba(55, 65, 81, 0.2)',
                            },
                        }}
                        onClick={() => setQuery({ q: city.name })}
                    >
                        {city.name}
                    </Button>
                ))
            )}
            <Input
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Add Your Favourite City"
                sx={{
                    marginLeft: '10px',
                    width: '200px',
                    height: '40px',
                    padding: '5px',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: 'grey.500',
                    fontWeight: 300,
                    '&::placeholder': {
                        textTransform: 'lowercase',
                    },
                    '&:hover': {
                        boxShadow: 14,
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            />
            <IoMdAdd
                onClick={handleAddCity}
                size={40}
                cursor='pointer'
            />
        </Box>
    );
}

export default TopButtons;
