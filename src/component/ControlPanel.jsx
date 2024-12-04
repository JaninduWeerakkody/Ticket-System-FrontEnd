import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ControlPanel = () => {
  return (
    <Box sx={{ mt:7 }} >
    <h1>Control Panel</h1>
    <Button variant="contained">Start</Button>
    <Button variant="outlined">Stop</Button>
    </Box>
  );
}

export default ControlPanel;