import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import eventsData from "../data/EventsData"; // mock data (still used elsewhere if needed)

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("adminEvents"));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      setEvents(eventsData);
    }
  }, []);

  return (
    <Stack spacing={3}>
      {/* Dashboard Header */}
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
        Welcome, Student 🌿
      </Typography>

      <Grid container spacing={3}>
        {/* Well-being Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <FavoriteIcon />
              <Typography variant="h6">Well-being Overview</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Stay balanced with routines that support your mental and physical health.
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

        {/* Counselor Connect */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EventAvailableIcon />
              <Typography variant="h6">Counselor Connect</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Book a confidential session with campus wellness counselors.
            </Typography>

            <Button component={Link} to="/connect" variant="contained" sx={{ mt: 2 }}>
              Book Session
            </Button>
          </Paper>
        </Grid>

        {/* Resources */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SchoolIcon />
              <Typography variant="h6">Resources</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button component={Link} to="/study-planner" variant="outlined">Study Planner</Button>
              <Button component={Link} to="/mindful-breathing" variant="outlined">Mindful Breathing</Button>
              <Button component={Link} to="/sleep-hygiene" variant="outlined">Sleep Hygiene</Button>
              <Button component={Link} to="/nutrition-basics" variant="outlined">Nutrition Basics</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
