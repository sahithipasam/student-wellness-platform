// src/Pages/AdminSessions.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminSessions() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("counsellingSessions")) || [];
    setSessions(stored);
  }, []);

  function updateStorage(updated) {
    setSessions(updated);
    localStorage.setItem(
      "counsellingSessions",
      JSON.stringify(updated)
    );
  }

  function handleCounsellorChange(index, value) {
    const updated = [...sessions];
    updated[index].counsellor = value;
    updateStorage(updated);
  }

  function handleStatusChange(index, value) {
    const updated = [...sessions];
    updated[index].status = value;
    updateStorage(updated);
  }

  function handleDelete(index) {
    const updated = sessions.filter((_, i) => i !== index);
    updateStorage(updated);
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>

      <Typography variant="h4" mb={3}>
        Manage Counselling Sessions
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>

        {sessions.length === 0 && (
          <Typography>No session requests</Typography>
        )}

        {sessions.map((s, index) => (

          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 2,
              alignItems: "center",
              mb: 2
            }}
          >

            <Typography>{s.student}</Typography>
            <Typography>{s.concern}</Typography>

            <TextField
              value={s.counsellor}
              placeholder="Assign counsellor"
              onChange={(e) =>
                handleCounsellorChange(index, e.target.value)
              }
            />

            <Select
              value={s.status}
              onChange={(e) =>
                handleStatusChange(index, e.target.value)
              }
            >
              <MenuItem value="Requested">Requested</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Follow-up">Follow-up</MenuItem>
            </Select>

            <IconButton onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>

          </Box>

        ))}

      </Paper>

    </Box>
  );
}