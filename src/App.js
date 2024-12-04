import React from "react";
import { Container, Box } from "@mui/material";
import ConfigurationForm from "./component/ConfigurationForm";
import ControlPanel from "./component/ControlPanel";
import LogDisplay from "./component/LogDisplay";
import TicketStatus from "./component/TicketStatus";

function App() {


  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
          <ConfigurationForm />
          <ControlPanel />
          <TicketStatus />
          <LogDisplay />
      </Box>
    </Container>
  );
}

export default App;
