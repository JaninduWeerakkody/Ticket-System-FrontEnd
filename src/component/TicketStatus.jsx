import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const TicketStatus = () => {
  const [ticketCount, setTicketCount] = useState(0); // State to hold ticket count
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch ticket count from API
  const fetchTicketCount = async () => {
    try {
      const response = await fetch('http://localhost:9095/api/tickets/count');
      
      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      
      const data = await response.json();
      

      
      if (!data.ticketsAvailable && data.ticketsAvailable !== 0) {
        throw new Error('Invalid JSON structure: ticketsAvailable not found');
      }

      // Update ticket count
      setTicketCount(data.ticketsAvailable);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket count:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  //fetch ticket count 
  useEffect(() => {
    fetchTicketCount();

    // Auto-refresh every 10 seconds
    const intervalId = setInterval(() => {
      fetchTicketCount();
    }, 10); 

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ mt: 7, textAlign: 'center' }}>
      <h1>Available Tickets</h1>
      {loading && <h4>Loading...</h4>}
      {error && <h4 style={{ color: 'red' }}>Error: {error}</h4>}
      {!loading && !error && <h4>{ticketCount}</h4>}
    </Box>
  );
}

export default TicketStatus;
