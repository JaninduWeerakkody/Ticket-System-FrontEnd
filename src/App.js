import React from "react";
import { Container, Paper, Box, Typography } from "@mui/material";
import ConfigurationForm from "./component/ConfigurationForm";
import ControlPanel from "./component/ControlPanel";
import LogDisplay from "./component/LogDisplay";
import TicketStatus from "./component/TicketStatus";

export default function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 2 }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3 }}>
                System Monitor
              </Typography>
              <LogDisplay />
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3 }}>
                Ticket Status
              </Typography>
              <TicketStatus />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    width: "100%",
                    mt: "33%",
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Control Panel
                  </Typography>
                  <ControlPanel />
                </Paper>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3 }}>
                System Configuration
              </Typography>
              <ConfigurationForm />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
