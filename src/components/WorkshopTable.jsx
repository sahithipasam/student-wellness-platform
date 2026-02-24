import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function WorkshopTable() {
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    date: "",
    speaker: "",
  });

  // Load saved workshops
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workshops")) || [];
    setWorkshops(saved);
  }, []);

  const saveToLocal = (updated) => {
    setWorkshops(updated);
    localStorage.setItem("workshops", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newWorkshop.title || !newWorkshop.date) return;
    const newData = [
      ...workshops,
      { id: Date.now(), ...newWorkshop },
    ];
    saveToLocal(newData);
    setNewWorkshop({ title: "", date: "", speaker: "" });
  };

  const handleRemove = (id) => {
    const filtered = workshops.filter((w) => w.id !== id);
    saveToLocal(filtered);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Manage Workshops & Events
      </Typography>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={3}>
        <TextField
          label="Title"
          value={newWorkshop.title}
          onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
        />
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newWorkshop.date}
          onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
        />
        <TextField
          label="Speaker"
          value={newWorkshop.speaker}
          onChange={(e) => setNewWorkshop({ ...newWorkshop, speaker: e.target.value })}
        />
        <Button variant="contained" onClick={handleAdd}>Add</Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Speaker</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workshops.map((w) => (
            <TableRow key={w.id}>
              <TableCell>{w.title}</TableCell>
              <TableCell>{w.date}</TableCell>
              <TableCell>{w.speaker || "—"}</TableCell>
              <TableCell align="right">
                <Button color="error" onClick={() => handleRemove(w.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}