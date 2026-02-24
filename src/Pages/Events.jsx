import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

export default function Events() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    // Fetch workshops from localStorage
    const saved = JSON.parse(localStorage.getItem("workshops"));
    console.log("Loaded workshops from storage:", saved); // 🪶 debug line

    if (saved && Array.isArray(saved) && saved.length > 0) {
      setWorkshops(saved);
    } else {
      setWorkshops([]);
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <EventIcon color="primary" />
          <Typography variant="h5" color="primary" fontWeight={600}>
            Upcoming Workshops & Events
          </Typography>
        </Stack>

        {workshops.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No events are available right now. Please check back later 🌿
          </Typography>
        ) : (
          <List>
            {workshops.map((w, i) => (
              <div key={w.id || i}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ color: "primary.main" }}>
                        {w.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Speaker: {w.speaker || "Guest Speaker"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Date: {w.date}
                        </Typography>
                      </>
                    }
                  />
                  <Chip
                    label="Available"
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: 600, mt: { xs: 1, sm: 0 } }}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}
