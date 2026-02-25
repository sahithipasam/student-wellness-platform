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

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    // MUST match AdminSessions key exactly
    const stored =
      JSON.parse(localStorage.getItem("counsellingSessions")) || [];

    // optional: filter only current student
    const auth =
      JSON.parse(localStorage.getItem("swell_auth_v1")) || {};

    const studentSessions =
      stored.filter(
        s => s.student === auth.username || !auth.username
      );

    setSessions(studentSessions);

  }, []);


  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>

      {/* TOP CARDS */}
      <Grid container spacing={4} mb={4}>

        {/* WELL BEING */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} fontSize={20} mb={1}>
              🧘 Well-being Overview
            </Typography>

            <Typography mb={2}>
              Stay balanced with routines that support your health.
            </Typography>

            <Button
              component={Link}
              to="/daily-routine"
              variant="contained"
              sx={{ backgroundColor: "#16A34A" }}
            >
              View Daily Routine
            </Button>

          </Paper>
        </Grid>


        {/* BOOK SESSION */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} fontSize={20} mb={1}>
              👩‍⚕️ Counselor Connect
            </Typography>

            <Typography mb={2}>
              Book and track your counselling sessions.
            </Typography>

            <Button
              component={Link}
              to="/connect"
              variant="contained"
              sx={{ backgroundColor: "#2563eb" }}
            >
              Book Session
            </Button>

          </Paper>
        </Grid>

      </Grid>



      {/* SESSION STATUS */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>

        <Typography variant="h5" fontWeight={700} mb={2}>
          My Counselling Sessions
        </Typography>


        {sessions.length === 0 && (
          <Typography color="text.secondary">
            No sessions yet
          </Typography>
        )}


        {sessions.map((s, index) => (

          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              border: "1px solid #e5e7eb"
            }}
          >

            <Typography fontWeight={600}>
              Concern: {s.concern}
            </Typography>

            <Typography>
              Date: {s.date}
            </Typography>

            <Typography>
              Counselor:
              {" "}
              {s.counsellor && s.counsellor.trim() !== ""
                ? s.counsellor
                : "Not assigned yet"}
            </Typography>


            <Chip
              label={s.status}
              sx={{
                mt: 1,
                backgroundColor: "#0f766e",
                color: "white"
              }}
            />

          </Paper>

        ))}

      </Paper>



      {/* RESOURCES */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>

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
                textAlign: "center",
                border: "2px solid #e5e7eb",
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
                p: 3,
                textAlign: "center",
                border: "2px solid #e5e7eb",
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
                p: 3,
                textAlign: "center",
                border: "2px solid #e5e7eb",
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
                p: 3,
                textAlign: "center",
                border: "2px solid #e5e7eb",
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