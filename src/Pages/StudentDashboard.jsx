
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>

      {/* TOP SECTION — Well-being + Counselor */}
      <Grid container spacing={4} mb={4}>

        {/* Well-being Overview */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: 260,
              borderRadius: 3,
              backgroundColor: "#f0fdf4"
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
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
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: 260,
              borderRadius: 3,
              backgroundColor: "#eff6ff"
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
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
              to="/book-session"
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


      {/* RESOURCES SECTION */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid #e5e7eb"
        }}
      >
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
              to="/nutrition"
              sx={{
                p: 3,
                height: 120,
                border: "2px solid #d1d5db",
                borderRadius: 2,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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

