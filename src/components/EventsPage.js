import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
  Divider,
  Chip
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import "../Pages/DailyRoutine.css";

function loadEvents() {

  const stored = JSON.parse(localStorage.getItem("adminEvents"));

  if (stored && stored.length > 0) {
    return stored;
  }

  return [];
}

export default function EventsPage() {

  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [registered, setRegistered] = useState({});

  useEffect(() => {

    setEvents(loadEvents());

    const saved =
      JSON.parse(localStorage.getItem("registeredEvents")) || {};

    setRegistered(saved);

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "registeredEvents",
      JSON.stringify(registered)
    );

  }, [registered]);


  function toggleRegistration(id) {

    const updated = { ...registered };

    if (updated[id]) {
      delete updated[id];
    }
    else {
      updated[id] = true;
    }

    setRegistered(updated);
  }


  const visible = events.filter(ev =>
    ev.title?.toLowerCase().includes(query.toLowerCase())
  );


  return (

    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >

        <Box>

          <Typography variant="h4" fontWeight={700}>
            Events & Workshops
          </Typography>

          <Typography color="text.secondary">
            Discover campus events
          </Typography>

        </Box>


        <TextField
          size="small"
          placeholder="Search events..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

      </Stack>


      <Divider sx={{ mb: 3 }} />


      {visible.length === 0 ?

        (
          <Typography>
            No events available
          </Typography>
        )

        :

        (

          <Grid container spacing={3}>

            {visible.map(ev => (

              <Grid item xs={12} md={6} lg={4} key={ev.id}>

                <Paper sx={{ p: 3 }}>

                  <Stack spacing={1}>

                    <Stack direction="row" spacing={1} alignItems="center">

                      <CalendarTodayIcon />

                      <Typography fontWeight={700}>
                        {ev.title}
                      </Typography>

                      <Chip
                        label={ev.type || "Event"}
                        size="small"
                        sx={{ marginLeft: "auto" }}
                      />

                    </Stack>


                    <Typography>
                      👤 Organizer: {ev.organizer}
                    </Typography>


                    <Typography color="text.secondary">
                      📅 {ev.date}
                    </Typography>


                    <Typography color="text.secondary">
                      🕒 {ev.time}
                    </Typography>


                    <Typography color="text.secondary">
                      📍 {ev.venue}
                    </Typography>


                    <Typography>
                      {ev.description}
                    </Typography>


                    <Button

                      variant={
                        registered[ev.id]
                          ? "outlined"
                          : "contained"
                      }

                      color={
                        registered[ev.id]
                          ? "error"
                          : "primary"
                      }

                      onClick={() =>
                        toggleRegistration(ev.id)
                      }

                    >
                      {
                        registered[ev.id]
                          ? "Cancel Registration"
                          : "Register"
                      }

                    </Button>


                  </Stack>

                </Paper>

              </Grid>

            ))}

          </Grid>

        )}

    </Box>
  );
}