import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
} from "@mui/material";

const StudentSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(stored);
  }, []);

  const studentEmail = localStorage.getItem("studentEmail");
  const studentName = localStorage.getItem("studentName");

  const mySessions = sessions.filter((s) => {
    if (studentEmail) return s.email === studentEmail;
    if (studentName) return s.name === studentName;
    return false;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "#064e3b", mb: 1 }}
        >
          My Counselling Sessions 📋
        </Typography>
        <Typography sx={{ mb: 3, color: "#555" }}>
          Track your session requests, status, and counsellor feedback.
        </Typography>

        {mySessions.length === 0 ? (
          <Typography color="text.secondary">
            You don&apos;t have any sessions yet. Use{" "}
            <b>Book Session</b> to request one.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {mySessions.map((s) => (
              <Paper
                key={s.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {s.concern}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  📅 Date: {s.date || "Not scheduled yet"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  🧑‍⚕️ Counsellor:{" "}
                  {s.counselor && s.counselor.trim() !== ""
                    ? s.counselor
                    : "Not assigned yet"}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={s.status || "Requested"}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
                {s.notes && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "#374151", fontStyle: "italic" }}
                  >
                    Counsellor Notes: {s.notes}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default StudentSessions;
