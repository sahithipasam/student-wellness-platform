// src/Pages/AdminSessions.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AdminSessions() {

  const [sessions, setSessions] = useState([]);
  const [savedDialogOpen, setSavedDialogOpen] = useState(false);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("counsellingSessions")) || [];
    setSessions(stored);
  }, []);

  function handleCounsellorChange(index, value) {
    const updated = [...sessions];
    updated[index].counsellor = value;
    setSessions(updated);
  }

  function handleStatusChange(index, value) {
    const updated = [...sessions];
    updated[index].status = value;
    setSessions(updated);
  }

  function handleDelete(index) {
    const updated = sessions.filter((_, i) => i !== index);
    setSessions(updated);
  }

  function handleSave() {
    localStorage.setItem(
      "counsellingSessions",
      JSON.stringify(sessions)
    );
    // Trigger custom event to notify other components
    window.dispatchEvent(new Event("counsellingSessions:updated"));
    
    // Show success dialog
    setSavedDialogOpen(true);
    
    // Auto-close dialog after 2 seconds
    setTimeout(() => {
      setSavedDialogOpen(false);
    }, 2000);
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, mb: 4 }}>

      <Typography variant="h4" mb={3} fontWeight={700}>
        Manage Counselling Sessions
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>

        {sessions.length === 0 && (
          <Typography>No session requests</Typography>
        )}

        {sessions.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                  <TableCell fontWeight={700}>Student</TableCell>
                  <TableCell fontWeight={700}>Concern</TableCell>
                  <TableCell fontWeight={700}>Date</TableCell>
                  <TableCell fontWeight={700}>Counsellor</TableCell>
                  <TableCell fontWeight={700}>Status</TableCell>
                  <TableCell fontWeight={700}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((s, index) => (
                  <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>
                    <TableCell>{s.student}</TableCell>
                    <TableCell>{s.concern}</TableCell>
                    <TableCell>{s.date}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={s.counsellor}
                        placeholder="Assign counsellor"
                        onChange={(e) =>
                          handleCounsellorChange(index, e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                        fullWidth
                      >
                        <MenuItem value="Requested">Requested</MenuItem>
                        <MenuItem value="Scheduled">Scheduled</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Follow-up">Follow-up</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleDelete(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {sessions.length > 0 && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#16A34A", "&:hover": { backgroundColor: "#15803d" } }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        )}

      </Paper>

      {/* Success Dialog */}
      <Dialog open={savedDialogOpen} onClose={() => setSavedDialogOpen(false)}>
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: "#16A34A", mb: 2 }} />
          <Typography variant="h6" fontWeight={700}>
            Changes Saved Successfully!
          </Typography>
        </DialogContent>
      </Dialog>

    </Box>
  );
}