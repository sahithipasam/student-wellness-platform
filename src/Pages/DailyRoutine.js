import React, { useState } from "react";
import DailyCalendar from "../components/DailyCalendar";
import TodoList from "../components/TodoList";
import "./DailyRoutine.css";

export default function DailyRoutine() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="page-container daily-routine-page">
      <div className="page-title">
        <h1>Daily Routine & Planner</h1>
        <p className="subtitle">Click a date to see or add tasks ✨</p>
      </div>

      <div className="grid-two">
        <DailyCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <TodoList selectedDate={selectedDate} />
      </div>
    </div>
  );
}
