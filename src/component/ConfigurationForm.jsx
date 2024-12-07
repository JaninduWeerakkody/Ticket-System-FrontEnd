import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ConfigurationForm = () => {
  const [configData, setConfigData] = useState({
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    maxTicketCapacity: "",
    numberOfVendors: "",
    numberOfCustomers: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateField = (name, value) => {
    if (value.trim() === "") {
      return "This field is required";
    }
    if (isNaN(value) || Number(value) < 0) {
      return "Please enter a valid positive number";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigData({
      ...configData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(configData).forEach((key) => {
      const error = validateField(key, configData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please correct the errors in the form",
        severity: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:9095/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(
          Object.entries(configData).map(([key, value]) => [key, Number(value)])
        )),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      setSnackbar({
        open: true,
        message: "Data submitted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
      setSnackbar({
        open: true,
        message: "Error occurred while submitting data",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Stack component="form" noValidate autoComplete="off" spacing={2} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <h1>Configuration Form</h1>
      {Object.keys(configData).map((key) => (
        <TextField
          key={key}
          required
          name={key}
          value={configData[key]}
          id={`outlined-required-${key}`}
          label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          onChange={handleChange}
          error={!!errors[key]}
          helperText={errors[key]}
          fullWidth
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ConfigurationForm;

