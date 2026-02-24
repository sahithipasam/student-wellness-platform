import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const STORAGE_KEY = "study_planner_v1";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMES = [
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00"
];

export default function StudyPlanner() {
  const [tasks, setTasks] = useState({});
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
  const [selectedTime, setSelectedTime] = useState(TIMES[8]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [editing, setEditing] = useState(null);

  // Load tasks
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {
      setTasks({});
    }
  }, []);

  // Save tasks
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  // Key based on current week logic
  function dayKeyByIndex(idx) {
    const today = new Date();

    // Find Sunday of this week
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());

    // Move to selected weekday
    const selected = new Date(sunday);
    selected.setDate(sunday.getDate() + idx);

    return selected.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function getTasksForDay(idx) {
    const key = dayKeyByIndex(idx);
    return tasks[key] || [];
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const key = dayKeyByIndex(selectedDayIndex);
    const list = tasks[key] ? [...tasks[key]] : [];

    if (editing) {
      const updated = list.map((it, i) =>
        editing.idx === i
          ? { ...it, title: title.trim(), subject: subject.trim(), time: selectedTime }
          : it
      );

      setTasks(prev => ({ ...prev, [key]: updated }));
      setEditing(null);
    } else {
      const newItem = {
        id: Date.now(),
        time: selectedTime,
        title: title.trim(),
        subject: subject.trim(),
        done: false
      };

      list.push(newItem);
      list.sort((a, b) => a.time.localeCompare(b.time));

      setTasks(prev => ({ ...prev, [key]: list }));
    }

    setTitle("");
    setSubject("");
  }

  function toggleDone(idx) {
    const key = dayKeyByIndex(selectedDayIndex);
    const list = [...(tasks[key] || [])];
    list[idx].done = !list[idx].done;
    setTasks(prev => ({ ...prev, [key]: list }));
  }

  function removeTask(idx) {
    const key = dayKeyByIndex(selectedDayIndex);
    const list = [...(tasks[key] || [])];
    list.splice(idx, 1);
    setTasks(prev => ({ ...prev, [key]: list }));
  }

  function startEdit(idx) {
    const key = dayKeyByIndex(selectedDayIndex);
    const item = tasks[key][idx];

    setSelectedTime(item.time);
    setTitle(item.title);
    setSubject(item.subject || "");
    setEditing({ idx });
  }

  return (
    <Box className="page-container" sx={{ maxWidth: 1100, margin: "0 auto" }}>
      <Box className="page-title" sx={{ mb: 2 }}>
        <Typography variant="h4">Study Planner</Typography>
        <Typography variant="body2" color="text.secondary">
          Plan your week — add slots & track progress.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* LEFT SIDE */}
        <Paper sx={{ p: 2, flex: 1 }}>
          {/* Weekday buttons */}
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {DAYS.map((d, i) => (
              <Button
                key={d}
                variant={i === selectedDayIndex ? "contained" : "outlined"}
                onClick={() => { 
                  setSelectedDayIndex(i);
                  setEditing(null);
                  setTitle("");
                  setSubject("");
                }}
                size="small"
              >
                {d}
              </Button>
            ))}
          </Stack>

          {/* Selected weekday (SHORT ONLY) */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {DAYS[selectedDayIndex]}
          </Typography>

          {/* Time slots */}
          <Stack spacing={1}>
            {TIMES.map((t) => {
              const dayTasks = getTasksForDay(selectedDayIndex);
              const found = dayTasks.filter(x => x.time === t);

              return (
                <Paper key={t} sx={{ p: 1 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ minWidth: 64 }}>{t}</Typography>

                    <Box sx={{ flex: 1 }}>
                      {found.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">— no task —</Typography>
                      ) : (
                        found.map((ft, idx) => {
                          const indexInFull = dayTasks.findIndex(x => x.id === ft.id);

                          return (
                            <Stack
                              key={ft.id}
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              sx={{ mt: idx ? 0.5 : 0 }}
                            >
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton size="small" onClick={() => toggleDone(indexInFull)}>
                                  <CheckIcon fontSize="small" color={ft.done ? "success" : "inherit"} />
                                </IconButton>

                                <Box>
                                  <Typography variant="body2" sx={{ textDecoration: ft.done ? "line-through" : "none" }}>
                                    {ft.title}
                                  </Typography>
                                  {ft.subject && (
                                    <Typography variant="caption" color="text.secondary">
                                      {ft.subject}
                                    </Typography>
                                  )}
                                </Box>
                              </Stack>

                              <Box>
                                <IconButton size="small" onClick={() => startEdit(indexInFull)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => removeTask(indexInFull)}>
                                  <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                              </Box>
                            </Stack>
                          );
                        })
                      )}
                    </Box>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Paper>

        {/* RIGHT SIDE — Add Task */}
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {editing ? "Edit Task" : "Add Task"}
          </Typography>

          <form onSubmit={handleAdd}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel>Time</InputLabel>
              <Select
                value={selectedTime}
                label="Time"
                onChange={(e) => setSelectedTime(e.target.value)}
                size="small"
              >
                {TIMES.map(t => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 1 }}
            />

            <TextField
              label="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 1 }}
            />

            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Button type="submit" variant="contained">
                {editing ? "Update" : "Add"}
              </Button>

              {editing && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => { setEditing(null); setTitle(""); setSubject(""); }}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
}
