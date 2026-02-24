import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbacks(storedFeedback);
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f9f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#0b5345", mb: 3 }}
      >
        Review Feedback 💬
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography>No feedback available yet.</Typography>
      ) : (
        feedbacks
          .slice()
          .reverse()
          .map((fb, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                backgroundColor: "#fff",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#eafaf1",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#0f766e" }}
              >
                {fb.event}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body1" sx={{ color: "#333", mb: 1 }}>
                {fb.message}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: "#0b5345" }}>
                — {fb.name}
              </Typography>

              <Typography variant="caption" sx={{ color: "gray" }}>
                📅 {fb.date}
              </Typography>
            </Paper>
          ))
      )}
    </Box>
  );
};

export default AdminFeedback;
