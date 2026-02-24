import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Avatar, Stack } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const AdminDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  const counselors = [
    { name: "Dr. Meena Sharma", specialty: "Mindfulness & Meditation" },
    { name: "Dr. Rohan Patel", specialty: "Stress Management" },
    { name: "Dr. Priya Nair", specialty: "Nutrition & Lifestyle" },
    { name: "Dr. Kiran Rao", specialty: "Cognitive Therapy" },
  ];

  useEffect(() => {
    const storedSessions =
      JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(storedSessions);

    const storedEvents =
      JSON.parse(localStorage.getItem("adminEvents")) || [];
    setEventCount(storedEvents.length);

    const storedFeedback =
      JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbackCount(storedFeedback.length);
  }, []);

  const calendarEvents = sessions.map((s) => ({
    title: `${s.name} (${s.counselor || "Unassigned"})`,
    start: s.date,
  }));

  return (
    <Box sx={{ p: 4, background: "#f5fffd", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>
        Admin Wellness Dashboard 🌿
      </Typography>

      {/* TWO CARDS ONLY */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: "Total Events & Workshops", value: eventCount },
          { title: "Feedback Received", value: feedbackCount },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={6} key={idx}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {card.title}
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Counselors */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Counselors List
            </Typography>
            <Stack spacing={2}>
              {counselors.map((c, i) => (
                <Box key={i} sx={{ display: "flex", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "#0f766e" }}>
                    {c.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography>{c.name}</Typography>
                    <Typography variant="body2" color="gray">
                      {c.specialty}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Session Calendar
            </Typography>

            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              dateClick={(info) =>
                alert("Selected Date: " + info.dateStr)
              }
              height="500px"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;