import { Box, Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

const TopButtons = ({ setQuery }) => {
    const [cityInput, setCityInput] = useState("");
    const [cities, setCities] = useState([
        { id: 1, name: 'London' },
        { id: 2, name: 'Sydney' },
        { id: 3, name: 'Tokyo' },
        { id: 4, name: 'Paris' },
        { id: 5, name: 'Toronto' }
    ]);

    const handleAddCity = () => {
        if (cityInput.trim() !== "") {
            const newCity = { id: Date.now(), name: cityInput };
            if (cities.length === 5) {
                // Replace the oldest city (the first one in the list)
                const newCities = [...cities.slice(1), newCity];
                setCities(newCities);
            } else {
                // Less than 5 cities, just add the new city
                setCities([...cities, newCity]);
            }
            setCityInput(""); // Clear input field after adding city
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            {cities.map((city) => (
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
            ))}
            {/* Input field for adding new city */}
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
            <IoMdAdd
                onClick={handleAddCity}
                size={40}
                cursor='pointer'
            />
                {/* Add
            </Button> */}
        </Box>
    );
}

export default TopButtons;
