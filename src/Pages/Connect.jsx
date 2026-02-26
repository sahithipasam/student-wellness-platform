import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

export default function Connect() {

  const [concern, setConcern] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!concern || !date) {
      alert("Please fill all fields");
      return;
    }

    const auth = JSON.parse(localStorage.getItem("swell_auth_v1"));

    const newSession = {
      student: auth?.username || "Unknown",
      email: auth?.username || "",
      concern,
      date,
      counsellor: "",
      status: "Requested"
    };

    const existing =
      JSON.parse(localStorage.getItem("counsellingSessions")) || [];

    const updated = [...existing, newSession];

    localStorage.setItem(
      "counsellingSessions",
      JSON.stringify(updated)
    );

    // Trigger custom event to notify other components
    window.dispatchEvent(new Event("counsellingSessions:updated"));

    alert("Session request submitted!");
    setConcern("");
    setDate("");
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>

      <Paper sx={{ p: 4, borderRadius: 3 }}>

        <Typography variant="h5" fontWeight={700} mb={3}>
          Book Counselling Session
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Concern"
            fullWidth
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#2563eb" }}
          >
            Submit Request
          </Button>

        </form>

      </Paper>

    </Box>
  );
}