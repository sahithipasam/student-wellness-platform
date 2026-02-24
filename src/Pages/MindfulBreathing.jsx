import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import "../Pages/DailyRoutine.css"; // using same CSS file for smooth styles

export default function MindfulBreathing() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [sessionDuration, setSessionDuration] = useState(60000); // default 1 min
  const timerRef = useRef(null);
  const phaseRef = useRef(null);

  const PHASES = [
    { name: "Inhale", duration: 4000 },
    { name: "Hold", duration: 2000 },
    { name: "Exhale", duration: 6000 }
  ];

  function startSession() {
    setIsRunning(true);
    setPhase("Inhale");
    let remaining = sessionDuration;

    let index = 0;
    function runPhase() {
      const current = PHASES[index];
      setPhase(current.name);

      phaseRef.current = setTimeout(() => {
        remaining -= current.duration;

        if (remaining <= 0) {
          stopSession();
          return;
        }

        index = (index + 1) % PHASES.length;
        runPhase();
      }, current.duration);
    }

    runPhase();
  }

  function stopSession() {
    setIsRunning(false);
    setPhase("Ready");
    clearTimeout(phaseRef.current);
    clearTimeout(timerRef.current);
  }

  useEffect(() => {
    return () => {
      clearTimeout(phaseRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Box className="page-container" sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Mindful Breathing 🌿
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Follow the circle as it expands and contracts.  
        Practicing mindful breathing reduces anxiety, improves focus, and relaxes the mind. 💛
      </Typography>

      {/* Center breathing animation */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Box
          className={`breathing-circle ${phase.toLowerCase()}`}
        ></Box>
      </Box>

      {/* Current Phase */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 600, mb: 3 }}
      >
        {phase === "Ready" ? "Click Start to Begin" : phase}
      </Typography>

      {/* Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Button
          variant={sessionDuration === 60000 ? "contained" : "outlined"}
          onClick={() => setSessionDuration(60000)}
          disabled={isRunning}
        >
          1 min
        </Button>

        <Button
          variant={sessionDuration === 180000 ? "contained" : "outlined"}
          onClick={() => setSessionDuration(180000)}
          disabled={isRunning}
        >
          3 min
        </Button>

        <Button
          variant={sessionDuration === 300000 ? "contained" : "outlined"}
          onClick={() => setSessionDuration(300000)}
          disabled={isRunning}
        >
          5 min
        </Button>
      </Stack>

      {/* Start / Stop */}
      <Stack direction="row" justifyContent="center">
        {!isRunning ? (
          <Button
            variant="contained"
            onClick={startSession}
            sx={{ px: 4 }}
          >
            Start
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={stopSession}
            sx={{ px: 4 }}
          >
            Stop
          </Button>
        )}
      </Stack>
    </Box>
  );
}
