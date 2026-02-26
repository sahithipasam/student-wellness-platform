// src/Pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip
} from "@mui/material";
import { Link } from "react-router-dom";

export default function StudentDashboard() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("counsellingSessions")) || [];

    const auth =
      JSON.parse(localStorage.getItem("swell_auth_v1"));

    const filtered =
      stored.filter(s => s.student === auth?.username);

    setSessions(filtered);
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>

      {/* TOP CARDS */}
      <Grid container spacing={4} mb={4}>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={700}>
              🧘 Well-being Overview
            </Typography>
            <Button
              component={Link}
              to="/daily-routine"
              variant="contained"
              sx={{ mt: 2 }}
            >
              View Daily Routine
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={700}>
              👩‍⚕️ Counselor Connect
            </Typography>
            <Button
              component={Link}
              to="/connect"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Book Session
            </Button>
          </Paper>
        </Grid>

      </Grid>


      {/* MY SESSIONS */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" mb={2}>
          My Counselling Sessions
        </Typography>

        {sessions.length === 0 ? (
          <Typography>No sessions yet</Typography>
        ) : (
          sessions.map((s, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography>
                Concern: {s.concern}
              </Typography>
              <Typography>
                Date: {s.date}
              </Typography>
              <Typography>
                Counselor: {s.counsellor || "Not assigned yet"}
              </Typography>
              <Chip
                label={s.status}
                sx={{ mt: 1 }}
              />
            </Paper>
          ))
        )}
      </Paper>


      {/* WELLNESS RESOURCES (LEFT ALIGNED) */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={3}>
          Wellness Resources
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/study-planner"
              sx={{
                p: 2,
                border: "1px solid #ddd",
                textDecoration: "none"
              }}
            >
              📚 Study Planner
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/mindful-breathing"
              sx={{
                p: 2,
                border: "1px solid #ddd",
                textDecoration: "none"
              }}
            >
              💗 Mindful Breathing
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/sleep-hygiene"
              sx={{
                p: 2,
                border: "1px solid #ddd",
                textDecoration: "none"
              }}
            >
              😴 Sleep Hygiene
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              component={Link}
              to="/nutrition-basics"
              sx={{
                p: 2,
                border: "1px solid #ddd",
                textDecoration: "none"
              }}
            >
              🥗 Nutrition Basics
            </Paper>
          </Grid>

        </Grid>
      </Paper>

    </Box>
  );
}