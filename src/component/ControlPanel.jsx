import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ControlPanel = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleApiCall = async (url, action) => {
    try {
      const response = await fetch(`http://localhost:9095/api/${url}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSnackbar({
        open: true,
        message: `${action} successful`,
        severity: "success",
      });
    } catch (error) {
      console.error(`Error occurred while ${action.toLowerCase()}:`, error);
      setSnackbar({
        open: true,
        message: `Error System already ${action.toLowerCase()}ed `,
        severity: "error",
      });
    }
  };

  const handleStart = () => handleApiCall("start", "Start");
  const handleStop = () => handleApiCall("stop", "Stop");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 7, textAlign: "center" }}>
      <h1>Control Panel</h1>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 5, mt: 2 }}>
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
        <Button variant="outlined" onClick={handleStop}>
          Stop
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ControlPanel;

