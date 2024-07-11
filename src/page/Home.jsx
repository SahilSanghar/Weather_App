import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import TopButtons from '../components/TopButtons'
import Inputs from '../components/Inputs'
import TimeAndLocation from '../components/TimeAndLocation'
import TempAndDetails from '../components/TempAndDetails'
import Forecast from '../components/Forecast'
import getFormattedWeatherData from '../services/weatherService'
import { toast } from 'react-toastify'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Home = () => {
    const [query, setQuery] = useState({q: 'tokyo'});
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(message)}`);

    const data = await getFormattedWeatherData({ ...query, units })
    .then((data) => {
        toast.success(`Fetching weather data for ${data.name}, ${data.country}`);
        setWeather(data);
    });
    };

    useEffect(() => {
        getWeather();
    }, [query, units]);

return (
    <Box marginX='auto' maxWidth='screen'  
    sx={{  
        background: 'linear-gradient(to bottom right, #00bcd4, #1976d2)',
        boxShadow: '10px 20px 20px rgba(0, 0, 0, 0.1)',
        padding: 2,
        borderRadius: 2
    }}>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {weather && (
        <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3-hour Step Forecast" data={weather.hourly} /><br />
            <Forecast title="Daily Forecast" data={weather.daily} />
        </>
        )}
    </Box>
)
}

export default Home