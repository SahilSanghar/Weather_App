import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import TopButtons from '../components/TopButtons'
import Inputs from '../components/Inputs'
import TimeAndLocation from '../components/TimeAndLocation'
import TempAndDetails from '../components/TempAndDetails'
import Forecast from '../components/Forecast'
import getFormattedWeatherData from '../services/weatherService'
import { toast } from 'react-toastify'
import MessageForm from '../components/MessageForm'
import MessagesList from '../components/MessageList'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getBackgroundColor = (weather) => {
    if (!weather) return '#00bcd4';

    const main = weather.details; 
    console.log('Weather data:', main);

    switch (main) {
        case 'Clear':
            return 'linear-gradient(to bottom right, #00bcd4, #1976d2)';
        case 'Clouds':
            return 'linear-gradient(to bottom right, #90caf9, #64b5f6)';
        case 'Rain':
            return 'linear-gradient(to bottom right, #4fc3f7, #0288d1)';
        case 'Snow':
            return 'linear-gradient(to bottom right, #e1f5fe, #81d4fa)';
        case 'Thunderstorm':
            return 'linear-gradient(to bottom right, #f57f17, #fbc02d)';
        default:
            return '#00bcd4';
    }
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
        console.log(data.details)
        if (data.details === 'Clouds') {
            toast.warning('Rain alert');
        }
        setWeather(data);
    });
    };

    
    useEffect(() => {
        getWeather();
    }, [query, units]);

return (
    <Box marginX='auto' maxWidth='screen'  
    sx={{  
        background: getBackgroundColor(weather),
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
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            <MessageForm />
            <MessagesList />
        </div>
    </Box>
)
}

export default Home