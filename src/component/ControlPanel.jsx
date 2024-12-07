import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ControlPanel = () => {
  const handleStart = async () => {
    try {
      const response = await fetch("http://localhost:9095/api/start", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Started successfully");
    } catch (error) {
      console.error("Error occurred while starting:", error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await fetch("http://localhost:9095/api/stop", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Stop successfully");
    } catch (error) {
      console.error("Error occurred while Stopping:", error);
    }
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
    </Box>
  );
};

export default ControlPanel;
