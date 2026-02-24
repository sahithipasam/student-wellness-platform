import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomIcon from "@mui/icons-material/Room";

const EventCard = ({ title, description, date, time, location }) => {

  const handleRegister = () => {
    const newEvent = { title, date, time, location };

    const saved = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    const exists = saved.some((e) => e.title === title);
    if (exists) {
      alert("You have already registered for this event!");
      return;
    }

    saved.push(newEvent);
    localStorage.setItem("registeredEvents", JSON.stringify(saved));

    alert("✅ Registered Successfully!");
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
        p: 2,
        width: 350,
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>

        {/* Description */}
        <Typography sx={{ color: "gray", mb: 2 }}>
          {description}
        </Typography>

        {/* ✅ Date + Time Row (Fixed alignment) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            flexWrap: "nowrap",
          }}
        >
          <CalendarTodayIcon fontSize="small" color="primary" />
          <Typography sx={{ whiteSpace: "nowrap" }}>{date}</Typography>

          <AccessTimeIcon fontSize="small" sx={{ ml: 2 }} />
          <Typography sx={{ whiteSpace: "nowrap" }}>{time}</Typography>
        </Box>

        {/* ✅ Location Row (Fixed alignment) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <RoomIcon fontSize="small" color="error" />
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {location}
          </Typography>
        </Box>

      </CardContent>

      {/* Register Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleRegister}
          sx={{
            borderRadius: 2,
            fontWeight: "bold",
            color: "#0f766e",
            borderColor: "#0f766e",
            "&:hover": {
              backgroundColor: "#e0f2f1",
              borderColor: "#0f766e",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Card>
  );
};

export default EventCard;