// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Read new login system auth from localStorage
  let auth = null;
  try {
    const raw = localStorage.getItem("swell_auth_v1");
    if (raw) auth = JSON.parse(raw);
  } catch {
    auth = null;
  }

  const role = auth?.role || null;

  function logout() {
    localStorage.removeItem("swell_auth_v1");
    navigate("/");
  }

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>

        {/* Title / Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: 700 }}
        >
          Student Wellness Platform
        </Typography>

        {/* Nav items */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>

          {/* Student menu */}
          {role === "student" && (
            <>
              <Button color="inherit" component={Link} to="/student-dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/events">Events & Workshops</Button>
              <Button color="inherit" component={Link} to="/connect">Counsellor Connect</Button>
              <Button color="inherit" component={Link} to="/feedback">Feedback</Button>
            </>
          )}

          {/* Admin menu */}
          {role === "admin" && (
            <>
              <Button color="inherit" component={Link} to="/admin-dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/admin/events">Manage Events</Button>
              <Button color="inherit" component={Link} to="/admin/feedback">Review Feedback</Button>
              <Button color="inherit" component={Link} to="/admin/sessions">Manage Sessions</Button>
            </>
          )}

          {/* Counsellor menu */}
          {role === "counsellor" && (
            <>
              <Button color="inherit" component={Link} to="/counsellor-dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/counsellor/sessions">Sessions</Button>
              <Button color="inherit" component={Link} to="/counsellor/notes">Notes</Button>
            </>
          )}

          {/* If not logged in, show minimal nav (optional) */}
          {!role && (
            <>
              <Button color="inherit" component={Link} to="/">Sign In</Button>
              <Button color="inherit" component={Link} to="/about">About</Button>
            </>
          )}

          {/* Logout */}
          {role && (
            <Button color="inherit" onClick={logout}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}