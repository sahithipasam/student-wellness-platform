import { Container, Paper, Typography } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          About Student Wellness
        </Typography>
        <Typography color="text.secondary">
          A calm, student-first platform that helps learners balance academics and well-being.
          Students can securely access guidance and book counseling support. Admins can track requests
          and coordinate wellness initiatives across campus.
        </Typography>
      </Paper>
    </Container>
  );
}
