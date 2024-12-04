import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const ConfigurationForm = () => {
  const [configData, setConfigData] = useState({
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    numberOfVendors: 0,
    numberOfCustomers: 0,
  });

  const handlechange = (e) => {
    setConfigData({
      ...configData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:9095/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(configData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data);
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
    }
  };
  

  return (
    <Stack component="form" noValidate autoComplete="off">
      <h1>Configuration Form</h1>
      <TextField
        required
        name="totalTickets"
        value={configData.totalTickets}
        id="outlined-required"
        label="Total Tickets"
        onChange={handlechange}
      />
      <TextField
        required
        name="ticketReleaseRate"
        value={configData.ticketReleaseRate}
        id="outlined-required"
        label="Ticket Release Rate"
        onChange={handlechange}
      />
      <TextField
        required
        name="customerRetrievalRate"
        value={configData.customerRetrievalRate}
        id="outlined-required"
        label="Customer Retrieval Rate"
        onChange={handlechange}
      />
      <TextField
        required
        name="maxTicketCapacity"
        value={configData.maxTicketCapacity}
        id="outlined-required"
        label="Max Ticket Capacity"
        onChange={handlechange}
      />
      <TextField
        required
        name="numberOfVendors"
        value={configData.numberOfVendors}
        id="outlined-required"
        label="Number of Vendors"
        onChange={handlechange}
      />
      <TextField
        required
        name="numberOfCustomers"
        value={configData.numberOfCustomers}
        id="outlined-required"
        label="Number of Customers"
        onChange={handlechange}
      />
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
};

export default ConfigurationForm;
