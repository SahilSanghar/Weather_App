import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const Forecast = ({ title, data }) => {
return (
    <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
            }}
            >
                <Typography variant='p' fontSize='25px' marginLeft={3} paddingBottom={1}>
                    {title}
                </Typography>
        </Box>
    <Divider variant="middle" sx={{ borderColor: 'white'}} />
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
                {data.map((d, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Typography variant='p' paddingTop={1}>
                            {d.title}
                        </Typography>
                        <img
                            src={d.icon}
                            alt='weather icon'
                            width='full'
                            style={{marginTop: '5px'}} />
                        <Typography variant='p'>
                            {`${d.temp.toFixed()}`}&deg;
                        </Typography>
                    </Box>
                ))}
        </Box>
    </>
)
}

export default Forecast