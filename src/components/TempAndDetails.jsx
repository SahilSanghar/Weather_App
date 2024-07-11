import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({
    weather: {
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like
    },
    units,
}) => {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()}`,
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()} %`,
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${ units === 'metric' ? 'km/h' : 'm/s'}`,
        },
    ];

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise,
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset,
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()}`,
        },,
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()}`,
        },
    ];

return (
    <>
        <Box 
            paddingY={5}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='p'>
                    {details}
                </Typography>
        </Box>

        <Box 
            paddingY={2}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}
        >
            <img 
                src={icon}
                alt='weather icon'
                width='full'
            />

            <Typography variant='p' fontSize='20px'>
                {`${temp.toFixed()}`} &deg;
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                }}>
                    {verticalDetails.map(({ id, Icon, title, value }) => (
                        <Box
                        paddingY='5px'
                            key={id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Icon size={16} sx={{ marginRight: '10px'}} />
                            {`${title}: `}
                            <Typography variant='span' paddingLeft={1}>
                                {value}
                            </Typography>
                        </Box>
                    ))}
            </Box>
        </Box>

        <Box
                paddingY={10}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {horizontalDetails.map(({ id, Icon, title, value }) => (
                    <Box 
                        key={id}
                        paddingX={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Icon /> &nbsp;
                        <Typography variant='p'>
                            {`${title} : `} &nbsp;
                            <Typography variant='span'>
                                {value}
                            </Typography>
                        </Typography>
                    </Box>
                ))}
            </Box>
    </>
)
}

export default TempAndDetails