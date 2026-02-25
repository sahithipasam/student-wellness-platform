// src/Pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  Chip
} from "@mui/material";
import { Link } from "react-router-dom";

export default function StudentDashboard() {

  // sessions state
  const [sessions, setSessions] = useState([]);

  // load sessions from localStorage
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("counsellingSessions")) ||
      JSON.parse(localStorage.getItem("sessions")) ||
      [];

    setSessions(stored);
  }, []);


  function getStatusColor(status) {
    switch (status) {
      case "Scheduled":
        return "primary";
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      case "Follow-up":
        return "warning";
      default:
        return "default";
    }
  }


  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>

      {/* TOP CARDS */}
      <Grid container spacing={4} mb={4}>

        {/* Well-being */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Typography fontSize="28px">🧘</Typography>
              <Typography variant="h6" fontWeight={700}>
                Well-being Overview
              </Typography>
            </Stack>

            <Typography color="text.secondary" mb={2}>
              Stay balanced with routines that support your mental and physical health.
            </Typography>

            <Button
              component={Link}
              to="/daily-routine"
              variant="contained"
              sx={{
                backgroundColor: "#16A34A",
                textTransform: "none",
                fontWeight: 600
              }}
            >
              View Daily Routine
            </Button>
          </Paper>
        </Grid>


        {/* Counselor Connect */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Typography fontSize="28px">👩‍⚕️</Typography>
              <Typography variant="h6" fontWeight={700}>
                Counselor Connect
              </Typography>
            </Stack>

            <Typography color="text.secondary" mb={2}>
              Book a confidential session with campus wellness counselors.
            </Typography>

            <Button
              component={Link}
              to="/connect"
              variant="contained"
              sx={{
                backgroundColor: "#3b82f6",
                textTransform: "none",
                fontWeight: 600
              }}
            >
              Book Session
            </Button>
          </Paper>
        </Grid>

      </Grid>



      {/* MY SESSIONS SECTION */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>

        <Typography variant="h5" fontWeight={700} mb={3}>
          My Counselling Sessions
        </Typography>

        {sessions.length === 0 ? (

          <Typography color="text.secondary">
            No sessions booked yet.
          </Typography>

        ) : (

          <Grid container spacing={2}>
            {sessions.map((s, index) => (

              <Grid item xs={12} md={6} key={index}>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb"
                  }}
                >

                  <Typography fontWeight={600}>
                    Concern: {s.concern || "-"}
                  </Typography>

                  <Typography>
                    Date: {s.date || "-"}
                  </Typography>

                  <Typography>
                    Counsellor: {s.counsellor || "Not assigned yet"}
                  </Typography>

                  <Box mt={1}>
                    <Chip
                      label={s.status || "Requested"}
                      color={getStatusColor(s.status)}
                    />
                  </Box>

                </Paper>

              </Grid>

            ))}
          </Grid>

        )}

      </Paper>



      {/* RESOURCES */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>

        <Typography variant="h5" fontWeight={700} mb={3}>
          Wellness Resources
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/study-planner"
              sx={{
                p: 3,
                height: 120,
                border: "2px solid #d1d5db",
                borderRadius: 2,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography fontWeight={600}>
                📚 Study Planner
              </Typography>
            </Paper>
          </Grid>


          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/mindful-breathing"
              sx={{
                p: 3,
                height: 120,
                border: "2px solid #d1d5db",
                borderRadius: 2,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography fontWeight={600}>
                💗 Mindful Breathing
              </Typography>
            </Paper>
          </Grid>


          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/sleep-hygiene"
              sx={{
                p: 3,
                height: 120,
                border: "2px solid #d1d5db",
                borderRadius: 2,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography fontWeight={600}>
                😴 Sleep Hygiene
              </Typography>
            </Paper>
          </Grid>


          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/nutrition-basics"
              sx={{
                p: 3,
                height: 120,
                border: "2px solid #d1d5db",
                borderRadius: 2,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography fontWeight={600}>
                🥗 Nutrition Basics
              </Typography>
            </Paper>
          </Grid>

        </Grid>

      </Paper>


    </Box>
  );
}