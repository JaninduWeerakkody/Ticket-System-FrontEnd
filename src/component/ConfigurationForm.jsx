import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ConfigurationForm = () => {
  const [configData, setConfigData] = useState({
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    maxTicketCapacity: "",
    numberOfVendors: "",
    numberOfCustomers: "",
  });

  const [currentConfig, setCurrentConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Fetch current configuration on component load
    const fetchCurrentConfig = async () => {
      try {
        const response = await fetch("http://localhost:9095/api/config");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentConfig(data);
      } catch (error) {
        console.error("Error fetching current configuration:", error);
      }
    };

    fetchCurrentConfig();
  }, []);


  // Function to validate form fields
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

  // Function to handle form submission
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
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(configData).map(([key, value]) => [key, Number(value)])
          )
        ),
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
      setCurrentConfig(data); // Update current config after submission
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
      setSnackbar({
        open: true,
        message: "Error occurred while submitting data",
        severity: "error",
      });
    }
  };

  // Function to close the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      spacing={2}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >

      {currentConfig && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h2>Current Configuration</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(currentConfig).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
       <h2>Configuration Form</h2>

      {Object.keys(configData).map((key) => (
        
        <TextField
          key={key}
          required
          name={key}
          value={configData[key]}
          id={`outlined-required-${key}`}
          label={key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
          onChange={handleChange}
          error={!!errors[key]}
          helperText={errors[key]}
          fullWidth
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ConfigurationForm;
