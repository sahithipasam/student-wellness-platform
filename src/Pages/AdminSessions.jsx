import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(stored);
  }, []);

  const updateSessions = (updated) => {
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    updateSessions(updated);
  };

  const handleCounsellorChange = (id, counselorName) => {
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, counselor: counselorName } : s
    );
    updateSessions(updated);
  };

  const handleDelete = (id) => {
    const updated = sessions.filter((s) => s.id !== id);
    updateSessions(updated);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "#064e3b", mb: 1 }}
        >
          Manage Counselling Sessions 🛠️
        </Typography>
        <Typography sx={{ mb: 3, color: "#555" }}>
          Review student requests, assign counsellors, and manage session
          statuses. Changes are reflected for both students and counsellors.
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: "#ffffff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {sessions.length === 0 ? (
            <Typography>No counselling requests yet.</Typography>
          ) : (
            <Box
              component="table"
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                "& th, & td": {
                  border: "1px solid #ddd",
                  padding: "10px",
                  verticalAlign: "top",
                  fontSize: "0.9rem",
                },
                "& th": {
                  backgroundColor: "#0f766e",
                  color: "#fff",
                  textAlign: "center",
                },
              }}
            >
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Concern</th>
                  <th>Counsellor</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>
                      {s.name}
                      {s.rollNumber && (
                        <div style={{ fontSize: "0.8rem", color: "#555" }}>
                          Roll: {s.rollNumber}
                        </div>
                      )}
                    </td>
                    <td>{s.email}</td>
                    <td>{s.date || "-"}</td>
                    <td>
                      <div>{s.concern}</div>
                      {s.details && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#555",
                            marginTop: "4px",
                          }}
                        >
                          {s.details}
                        </div>
                      )}
                    </td>
                    <td style={{ minWidth: 170 }}>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Type counsellor name"
                        value={s.counselor || ""}
                        onChange={(e) =>
                          handleCounsellorChange(s.id, e.target.value)
                        }
                      />
                    </td>
                    <td style={{ minWidth: 150 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          value={s.status || "Requested"}
                          onChange={(e) =>
                            handleStatusChange(s.id, e.target.value)
                          }
                        >
                          <MenuItem value="Requested">Requested</MenuItem>
                          <MenuItem value="Scheduled">Scheduled</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                          <MenuItem value="Follow-up">Follow-up</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleDelete(s.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminSessions;
