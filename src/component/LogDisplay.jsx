import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert, Paper, List, ListItem, ListItemText, Button, Stack } from "@mui/material";

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch logs
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:9095/api/log");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Reverse the order of the logs to display the most recent at the top
      const reversedLogs = data.reverse();

      setLogs(reversedLogs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear logs
  const clearLogs = async () => {
    try {
      const response = await fetch("http://localhost:9095/api/log", {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to clear logs. Status: ${response.status}`);
      }
      setLogs([]); // Clear logs in the UI
    } catch (error) {
      setError('Failed to clear logs: ' + error.message);
    }
  };

  // UseEffect hook to auto-refresh logs every 5 seconds
  useEffect(() => {
    fetchLogs(); // Fetch logs immediately when component mounts

    const interval = setInterval(() => {
      fetchLogs(); // Fetch logs every 5 seconds
    }, 5000); // Set interval to 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        System Logs
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          color="error" 
          onClick={clearLogs} 
          disabled={loading}
        >
          Clear Logs
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ maxHeight: "600px", overflowY: "auto", p: 2 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">Error: {error}</Alert>}

        {!loading && !error && logs.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No logs available.
          </Typography>
        )}

        {!loading && !error && logs.length > 0 && (
          <List>
            {logs.map((log, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={log} 
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default LogDisplay;
