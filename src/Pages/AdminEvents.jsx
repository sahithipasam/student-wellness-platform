import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import eventsData from "../data/EventsData";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    description: "",
  });

  // Load mock data and saved data from localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("adminEvents"));
    if (savedEvents && savedEvents.length > 0) {
      setEvents(savedEvents);
    } else {
      setEvents(eventsData);
      localStorage.setItem("adminEvents", JSON.stringify(eventsData));
    }
  }, []);

  // Add a new event
  const handleAddEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.venue ||
      !newEvent.organizer
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
    setEvents(updatedEvents);
    localStorage.setItem("adminEvents", JSON.stringify(updatedEvents));

    setNewEvent({
      title: "",
      date: "",
      time: "",
      venue: "",
      organizer: "",
      description: "",
    });
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("adminEvents", JSON.stringify(updatedEvents));
  };

  // Start editing
  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setEditForm(event);
  };

  // Save edited event
  const handleSaveEdit = () => {
    const updatedEvents = events.map((event) =>
      event.id === editingEventId ? { ...editForm } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("adminEvents", JSON.stringify(updatedEvents));
    setEditingEventId(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingEventId(null);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f9f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#0b5345",
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Manage Events 🌸
      </Typography>

      {/* Add Event Form */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 5,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
        >
          Add New Event
        </Typography>

        {["title", "organizer", "date", "time", "venue", "description"].map(
          (field) => (
            <TextField
              key={field}
              label={
                field.charAt(0).toUpperCase() + field.slice(1) + (field !== "description" ? " *" : "")
              }
              type={field === "date" ? "date" : field === "time" ? "time" : "text"}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputLabelProps={
                field === "date" || field === "time" ? { shrink: true } : {}
              }
              value={newEvent[field]}
              onChange={(e) =>
                setNewEvent({ ...newEvent, [field]: e.target.value })
              }
              multiline={field === "description"}
              rows={field === "description" ? 2 : 1}
            />
          )
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleAddEvent}
          sx={{
            backgroundColor: "#0f766e",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#0b5f57" },
          }}
        >
          Add Event
        </Button>
      </Paper>

      {/* Existing Events */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: "#0b5345",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Existing Events
      </Typography>

      {events.length === 0 ? (
        <Typography textAlign="center">No events available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                {editingEventId === event.id ? (
                  <>
                    <TextField
                      label="Title"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />
                    <TextField
                      label="Organizer"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={editForm.organizer}
                      onChange={(e) =>
                        setEditForm({ ...editForm, organizer: e.target.value })
                      }
                    />
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 1 }}
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                    />
                    <TextField
                      label="Time"
                      type="time"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 1 }}
                      value={editForm.time}
                      onChange={(e) =>
                        setEditForm({ ...editForm, time: e.target.value })
                      }
                    />
                    <TextField
                      label="Venue"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={editForm.venue}
                      onChange={(e) =>
                        setEditForm({ ...editForm, venue: e.target.value })
                      }
                    />
                    <TextField
                      label="Description"
                      multiline
                      rows={2}
                      fullWidth
                      sx={{ mb: 1 }}
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Button
                        onClick={handleSaveEdit}
                        variant="contained"
                        sx={{
                          flex: 1,
                          backgroundColor: "#0f766e",
                          "&:hover": { backgroundColor: "#0b5f57" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outlined"
                        sx={{ flex: 1 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ color: "#0f766e", fontWeight: "bold" }}
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      👤 Organizer: {event.organizer}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      📅 {event.date} &nbsp;&nbsp; 🕒 {event.time}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      📍 {event.venue}
                    </Typography>
                    {event.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {event.description}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Button
                        onClick={() => handleEditEvent(event)}
                        variant="outlined"
                        sx={{
                          flex: 1,
                          borderColor: "#0f766e",
                          color: "#0f766e",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#eafaf1" },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteEvent(event.id)}
                        sx={{
                          flex: 1,
                          backgroundColor: "#f44336",
                          color: "#fff",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#d32f2f" },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminEvents;
