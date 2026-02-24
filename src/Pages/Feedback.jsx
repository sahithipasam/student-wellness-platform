import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function Feedback() {
  const [form, setForm] = useState({ name: "", event: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbacks =
      JSON.parse(localStorage.getItem("feedback")) || [];

    feedbacks.push({
      ...form,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("feedback", JSON.stringify(feedbacks));

    setSubmitted(true);
    setForm({ name: "", event: "", message: "" });
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Workshop Feedback 💬
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you for your feedback!
          </Alert>
        )}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Workshop/Event"
            required
            value={form.event}
            onChange={(e) => setForm({ ...form, event: e.target.value })}
          />

          <TextField
            label="Your Feedback"
            multiline
            minRows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
