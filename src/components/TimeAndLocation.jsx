import { Box, Typography } from '@mui/material'
import React from 'react'

const TimeAndLocation = ({
    weather: { formattedLocalTime, name, country },
}) => {
return (
    <Box>
        <Box 
            marginY={4} 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography>
                {formattedLocalTime}
            </Typography>
        </Box>

        <Box 
            marginY={2} 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography variant='p' fontSize='24px'>
                {`${name}, ${country}`}
            </Typography>
        </Box>
    </Box>
)
}

export default TimeAndLocation