import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Checkbox,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Pages/DailyRoutine.css";

const STORAGE_KEY = "sleep_hygiene_tasks_v1";

const DEFAULT_TASKS = [
  "Avoid using screens 30 minutes before sleep",
  "Drink a glass of water",
  "Keep your room cool and dark",
  "Do 2 minutes of deep breathing",
  "Write down tomorrow’s tasks",
  "Stretch lightly before bed"
];

const TIPS = [
  "Maintain a fixed sleep and wake time daily.",
  "Avoid heavy meals 2 hours before bedtime.",
  "Reduce caffeine intake in the evening.",
  "Keep your phone away from the bed.",
  "A warm shower can improve sleep quality.",
  "Read something calming for 10 minutes."
];

export default function SleepHygiene() {
  const [tasks, setTasks] = useState([]);
  const [tips] = useState(TIPS);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) setTasks(stored);
    else setTasks(DEFAULT_TASKS.map(t => ({ text: t, done: false })));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function toggleDone(index) {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  }

  function removeTask(index) {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  }

  function resetChecklist() {
    setTasks(DEFAULT_TASKS.map(t => ({ text: t, done: false })));
  }

  return (
    <Box className="page-container" sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Sleep Hygiene 🌙
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A consistent bedtime routine helps improve sleep quality, reduces stress,
        and prepares your mind to rest peacefully.
      </Typography>

      <Stack spacing={3}>

        {/* Routine Checklist */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bedtime Routine Checklist
          </Typography>

          <Stack spacing={1}>
            {tasks.map((task, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: task.done ? "#e8f5e9" : "#fafafa",
                  borderRadius: 2
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Checkbox
                    checked={task.done}
                    onChange={() => toggleDone(index)}
                  />
                  <Typography
                    sx={{
                      textDecoration: task.done ? "line-through" : "none",
                      color: task.done ? "#555" : "#000"
                    }}
                  >
                    {task.text}
                  </Typography>
                </Stack>

                <IconButton onClick={() => removeTask(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Paper>
            ))}
          </Stack>

          <Button
            variant="outlined"
            color="primary"
            onClick={resetChecklist}
            sx={{ mt: 2 }}
          >
            Reset to Default
          </Button>
        </Paper>

        {/* Tips Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tips for Better Sleep
          </Typography>

          <Stack spacing={1}>
            {tips.map((tip, i) => (
              <Typography key={i} variant="body2">
                🌙 {tip}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
