import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Checkbox,
  Button
} from "@mui/material";
import "../Pages/DailyRoutine.css";

const WATER_KEY = "hydration_tracker_v1";
const FRUIT_KEY = "fruits_tracker_v1";

const FRUIT_ITEMS = [
  "A fruit today 🍎",
  "A bowl of veggies 🥦",
  "Avoid junk food 🚫🍟",
  "1 protein source (egg, dal, paneer, etc.) 🍳",
  "Fiber-rich food (banana, oats, etc.) 🍌"
];

const MEAL_SUGGESTIONS = [
  { meal: "Breakfast", idea: "Oats + Banana + Milk or Idli + Sambar" },
  { meal: "Lunch", idea: "Rice + Dal + Veg Curry + Curd" },
  { meal: "Snack", idea: "Fruits / Dry fruits / Lemon water" },
  { meal: "Dinner", idea: "Chapati + Veg Curry or Khichdi" }
];

const NUTRITION_TIPS = [
  "Eat your meals on time.",
  "Avoid too many sugary snacks.",
  "Include at least one protein source daily.",
  "Drink 6–8 glasses of water.",
  "Avoid skipping breakfast.",
  "Add colorful veggies to your plate.",
  "Cut down on packaged foods.",
];

export default function NutritionBasics() {
  const [water, setWater] = useState(new Array(8).fill(false));
  const [fruitChecks, setFruitChecks] = useState(FRUIT_ITEMS.map(() => false));

  // Load stored hydration + fruit choices
  useEffect(() => {
    const w = JSON.parse(localStorage.getItem(WATER_KEY));
    const f = JSON.parse(localStorage.getItem(FRUIT_KEY));

    if (w) setWater(w);
    if (f) setFruitChecks(f);
  }, []);

  // Save hydration + fruit choices
  useEffect(() => {
    localStorage.setItem(WATER_KEY, JSON.stringify(water));
    localStorage.setItem(FRUIT_KEY, JSON.stringify(fruitChecks));
  }, [water, fruitChecks]);

  function toggleWater(i) {
    const updated = [...water];
    updated[i] = !updated[i];
    setWater(updated);
  }

  function toggleFruit(i) {
    const updated = [...fruitChecks];
    updated[i] = !updated[i];
    setFruitChecks(updated);
  }

  function resetHydration() {
    setWater(new Array(8).fill(false));
  }

  function resetFruitChecklist() {
    setFruitChecks(FRUIT_ITEMS.map(() => false));
  }

  return (
    <Box className="page-container" sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Nutrition Basics 🥗
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Eating healthy fuels your body, boosts your energy, and keeps your mind fresh.
      </Typography>

      <Stack spacing={3}>

        {/* Hydration Tracker */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Daily Hydration Tracker 💧
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
            Aim for 6–8 glasses a day.
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {water.map((done, i) => (
              <Paper
                key={i}
                onClick={() => toggleWater(i)}
                sx={{
                  p: 2,
                  width: 70,
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: 2,
                  bgcolor: done ? "#e0f7fa" : "#fafafa",
                  border: done ? "2px solid #00acc1" : "1px solid #eee",
                  transition: "0.2s"
                }}
              >
                <Typography variant="body2">
                  {done ? "💧" : "○"} {i + 1}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={resetHydration}
          >
            Reset Hydration
          </Button>
        </Paper>

        {/* Fruits & Veggies Checklist */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Daily Healthy Choices 🍎
          </Typography>

          <Stack spacing={1}>
            {FRUIT_ITEMS.map((text, i) => (
              <Paper
                key={i}
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  bgcolor: fruitChecks[i] ? "#e8f5e9" : "#fafafa",
                  borderRadius: 2
                }}
              >
                <Checkbox
                  checked={fruitChecks[i]}
                  onChange={() => toggleFruit(i)}
                />
                <Typography
                  sx={{
                    textDecoration: fruitChecks[i] ? "line-through" : "none",
                    color: fruitChecks[i] ? "#555" : "#000"
                  }}
                >
                  {text}
                </Typography>
              </Paper>
            ))}
          </Stack>

          {/* RESET BUTTON */}
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={resetFruitChecklist}
          >
            Reset Healthy Choices
          </Button>
        </Paper>

        {/* Meal Suggestions */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Simple Meal Ideas 🍽️
          </Typography>

          <Stack spacing={1}>
            {MEAL_SUGGESTIONS.map((m, i) => (
              <Typography key={i} variant="body2">
                <strong>{m.meal}:</strong> {m.idea}
              </Typography>
            ))}
          </Stack>
        </Paper>

        {/* Nutrition Tips */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Nutrition Tips 🌿
          </Typography>

          <Stack spacing={1}>
            {NUTRITION_TIPS.map((tip, i) => (
              <Typography key={i} variant="body2">
                ✓ {tip}
              </Typography>
            ))}
          </Stack>
        </Paper>

      </Stack>
    </Box>
  );
}
