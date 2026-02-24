// src/Pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

export default function Login() {
  const CACHE_KEY = "swell_login_cache_v1";
  const AUTH_KEY = "swell_auth_v1";
  const navigate = useNavigate();

  
  const initial = (() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { role: "student", username: "", password: "" };
  })();

  const [role, setRole] = useState(initial.role || "student");
  const [username, setUsername] = useState(initial.username || "");
  const [password, setPassword] = useState(initial.password || "");
  const [busy, setBusy] = useState(false);

  // CAPTCHA states
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // persist small cache
  useEffect(() => {
    try {
      const payload = { role, username, password };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {}
  }, [role, username, password]);

  // generate captcha
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(code);
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  // demo fillers
  function fillDemo(roleKey) {
    if (roleKey === "student") {
      setRole("student");
      setUsername("student@wellness.com");
      setPassword("student123");
    } else if (roleKey === "admin") {
      setRole("admin");
      setUsername("admin@wellness.com");
      setPassword("admin123");
    } 
    generateCaptcha();
    setCaptchaInput("");
  }

  // when login is successful, write auth and navigate
  function handleSuccessfulLogin() {
    const authObj = { username: username.trim(), role, loggedAt: Date.now() };
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authObj));
    } catch {}
    if (role === "student") navigate("/student-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
   
    else navigate("/");
  }

  function onSubmit(e) {
    e.preventDefault();

    // captcha validation
    if (captchaInput.trim().toUpperCase() !== captcha.toUpperCase()) {
      alert("Incorrect CAPTCHA. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    if (!username.trim() || !password) {
      alert("Please enter username and password.");
      return;
    }

    setBusy(true);
    // simulate authentication delay; replace with real API later
    setTimeout(() => {
      setBusy(false);
      // For now any credentials are accepted (or use demo buttons)
      handleSuccessfulLogin();
    }, 600);
  }

  return (
    <Box className="login-page-outer">
      <Paper elevation={6} className="login-card">
        <Typography variant="h4" className="login-title">Student Wellness Login</Typography>

        {/* ROLE SELECTOR */}
        <div className="role-selector" role="tablist" aria-label="Select role">
          <button
            className={`role-btn ${role === "student" ? "active-role" : ""}`}
            onClick={() => setRole("student")}
            type="button"
          >
            Student
          </button>

          <button
            className={`role-btn ${role === "admin" ? "active-role" : ""}`}
            onClick={() => setRole("admin")}
            type="button"
          >
            Admin
          </button>

          
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          <TextField
            label="Username *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            size="small"
            className="login-input"
            autoComplete="username"
          />

          <TextField
            label="Password *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
            className="login-input"
            autoComplete="current-password"
          />

          {/* CAPTCHA */}
          <Stack spacing={1} sx={{ mt: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>Enter CAPTCHA *</Typography>

            <Box className="captcha-box" role="img" aria-label="captcha">
              <span className="captcha-text">{captcha}</span>
              <button
                type="button"
                className="captcha-refresh"
                onClick={() => { generateCaptcha(); setCaptchaInput(""); }}
                aria-label="Refresh captcha"
              >
                ↻
              </button>
            </Box>

            <TextField
              placeholder="Enter the code above"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              fullWidth
              size="small"
              className="login-input"
              inputProps={{ "aria-label": "captcha input" }}
            />
          </Stack>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={busy}
            className="login-button"
            sx={{ mt: 1 }}
          >
            {busy ? "Please wait..." : "LOGIN"}
          </Button>

          <Stack spacing={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => fillDemo("student")}>Student Demo</Button>
            <Button variant="outlined" onClick={() => fillDemo("admin")}>Admin Demo</Button>
           
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
