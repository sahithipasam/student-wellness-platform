import React, { useEffect, useState } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Stack, 
  Divider, 
  Grid 
} from "@mui/material";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("adminEvents"));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        mb={4}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Button 
          component={Link}
          to="/dashboard" 
          variant="text" 
          sx={{ 
            color: "#16A34A", 
            fontWeight: 600,
            textTransform: "none",
            minWidth: "auto",
            p: 0
          }}
        >
          Dashboard
        </Button>
        <Button 
          component={Link}
          to="/events-workshops" 
          variant="text" 
          sx={{ 
            color: "#16A34A", 
            fontWeight: 600,
            textTransform: "none",
            minWidth: "auto",
            p: 0
          }}
        >
          Events & Workshops
        </Button>
        <Button 
          component={Link}
          to="/counselor-connect" 
          variant="text" 
          sx={{ 
            color: "#16A34A", 
            fontWeight: 600,
            textTransform: "none",
            minWidth: "auto",
            p: 0
          }}
        >
          Counselor Connect
        </Button>
        <Button 
          component={Link}
          to="/feedback" 
          variant="text" 
          sx={{ 
            color: "#16A34A", 
            fontWeight: 600,
            textTransform: "none",
            minWidth: "auto",
            p: 0
          }}
        >
          Feedback
        </Button>
        <Button 
          variant="text" 
          sx={{ 
            color: "#16A34A", 
            fontWeight: 600,
            textTransform: "none",
            minWidth: "auto",
            p: 0
          }}
        >
          Logout
        </Button>
      </Stack>

      {/* First Screen: Resources */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          borderRadius: 3,
          border: "1px solid #bbf7d0"
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: "#15803d", 
            mb: 3,
            fontSize: { xs: "1.5rem", md: "2rem" }
          }}
        >
          Wellness Resources
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#166534", 
            mb: 4, 
            fontSize: "1.1rem",
            fontWeight: 500
          }}
        >
          Tools and guides to support your journey
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                height: 140, 
                backgroundColor: "#fef3c7",
                border: "2px solid #f59e0b",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography variant="h6" fontWeight={600} color="#d97706" textAlign="center">
                📚 Study Planner
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                height: 140, 
                backgroundColor: "#fce7f3",
                border: "2px solid #ec4899",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography variant="h6" fontWeight={600} color="#be185d" textAlign="center">
                💗 Mindful Breathing
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                height: 140, 
                backgroundColor: "#dbeafe",
                border: "2px solid #3b82f6",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography variant="h6" fontWeight={600} color="#1d4ed8" textAlign="center">
                😴 Sleep Hygiene
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                height: 140, 
                backgroundColor: "#f0fdf4",
                border: "2px solid #16a34a",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 }
              }}
            >
              <Typography variant="h6" fontWeight={600} color="#15803d" textAlign="center">
                🥗 Nutrition Basics
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={4} justifyContent="center">
          <Button 
            component={Link}
            to="/daily-routine"
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: "#16A34A",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              "&:hover": { backgroundColor: "#15803d" }
            }}
          >
            View Daily Routine
          </Button>
          <Button 
            component={Link}
            to="/book-session"
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: "#16A34A",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              "&:hover": { backgroundColor: "#15803d" }
            }}
          >
            Book Session
          </Button>
        </Stack>
      </Paper>

      {/* Second Screen: Overview + Counselor */}
      <Grid container spacing={4} mb={4}>
        {/* Well-being Overview */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              height: 320,
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#f0fdf4"
            }}
          >
            <Box 
              sx={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1541795795328-f0737cf20a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                <Box 
                  sx={{ 
                    width: 50, 
                    height: 50, 
                    bgcolor: "#22c55e", 
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="h5" color="white" fontWeight={700}>
                    🧘
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ fontWeight: 700, color: "#15803d" }}
                >
                  Well-being Overview
                </Typography>
              </Stack>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#166534", 
                  mb: 3, 
                  lineHeight: 1.6,
                  fontSize: "1rem"
                }}
              >
                Track daily wellness
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#047857", 
                  mb: 4, 
                  lineHeight: 1.5,
                  fontWeight: 500
                }}
              >
                Stay balanced with routines that support your mental and physical health.
              </Typography>
              
              <Button
                component={Link}
                to="/daily-routine"
                variant="contained"
                sx={{ 
                  backgroundColor: "#22c55e",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)"
                }}
              >
                View Daily Routine
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Counselor Connect */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              height: 320,
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#eff6ff"
            }}
          >
            <Box 
              sx={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                <Box 
                  sx={{ 
                    width: 50, 
                    height: 50, 
                    bgcolor: "#3b82f6", 
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="h5" color="white" fontWeight={700}>
                    👩‍⚕️
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ fontWeight: 700, color: "#1e40af" }}
                >
                  Counselor Connect
                </Typography>
              </Stack>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#1e40af", 
                  mb: 3, 
                  lineHeight: 1.6,
                  fontSize: "1rem"
                }}
              >
                Professional support
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#1d4ed8", 
                  mb: 4, 
                  lineHeight: 1.5,
                  fontWeight: 500
                }}
              >
                Book a confidential session with campus wellness counselors.
              </Typography>
              
              <Button
                component={Link}
                to="/connect"
                variant="contained"
                sx={{ 
                  backgroundColor: "#3b82f6",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
                }}
              >
                Book Session
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Third Screen: Welcome */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
          borderRadius: 3,
          border: "1px solid #a7f3d0",
          textAlign: "center"
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            background: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.5rem" }
          }}
        >
          Welcome Back, Student! 🌿
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "#166534", 
            mb: 4,
            fontSize: { xs: "1.1rem", md: "1.3rem" }
          }}
        >
          Take care of your mental and physical well-being
        </Typography>
        
        <Box 
          sx={{ 
            width: 300, 
            height: 300, 
            mx: "auto",
            backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            border: "8px solid #22c55e",
            mb: 3,
            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
          }}
        />
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: "#15803d", 
            mb: 4,
            fontWeight: 700,
            fontSize: { xs: "1.3rem", md: "1.6rem" }
          }}
        >
          Your Wellness Journey Starts Here! 😊
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#047857", 
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6
          }}
        >
          Prioritize your mental and emotional balance
        </Typography>
        
        <Button
          component={Link}
          to="/book-session"
          variant="contained"
          size="large"
          sx={{ 
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            borderRadius: 3,
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
            "&:hover": { 
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              boxShadow: "0 12px 35px rgba(34, 197, 94, 0.5)"
            }
          }}
        >
          Book a Session
        </Button>
      </Paper>
    </Box>
  );
}