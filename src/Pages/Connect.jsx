import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

const concerns = [
  "Academic Stress",
  "Anxiety",
  "Family Issues",
  "Relationships",
  "Career Confusion",
  "Other",
];

const Connect = () => {
  const [name, setName] = useState(localStorage.getItem("studentName") || "");
  const [email, setEmail] = useState(localStorage.getItem("studentEmail") || "");
  const [rollNumber, setRollNumber] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("");
  const [details, setDetails] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !preferredDate || !selectedConcern) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Persist student info for later use
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);

    const existing = JSON.parse(localStorage.getItem("sessions")) || [];

    const newSession = {
      id: Date.now(),
      name,
      email,
      rollNumber,
      concern: selectedConcern,
      details,
      date: preferredDate,      // yyyy-mm-dd
      counselor: "",            // admin will assign later
      status: "Requested",      // admin/counsellor will move to Scheduled/Completed
      notes: "",
    };

    const updated = [...existing, newSession];
    localStorage.setItem("sessions", JSON.stringify(updated));

    setMessage("Your counselling request has been submitted.");
    setSelectedConcern("");
    setDetails("");
    setPreferredDate("");
  };

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
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 800, color: "#064e3b" }}
          >
            Book a Counselling Session 💬
          </Typography>
          <Typography sx={{ mb: 3, color: "#555" }}>
            Your details are confidential. The counsellor will review your
            request and you can track updates under <b>My Sessions</b>.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                label="College Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                label="Roll Number (optional)"
                fullWidth
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />

              <TextField
                select
                label="Primary Concern"
                fullWidth
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                required
              >
                {concerns.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Additional Details (optional)"
                multiline
                minRows={3}
                fullWidth
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />

              <TextField
                label="Preferred Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#0f766e",
                  "&:hover": { backgroundColor: "#0b5149" },
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Submit Request
              </Button>

              {message && (
                <Typography sx={{ mt: 1, color: "#0f766e" }}>
                  {message}
                </Typography>
              )}
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Connect;
