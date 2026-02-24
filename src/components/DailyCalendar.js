import React, { useState, useMemo, useEffect } from "react";
import "../Pages/DailyRoutine.css";

const TODOS_KEY = "calendar_todos_v2";

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export default function DailyCalendar({ selectedDate, onDateChange }) {
  const [viewDate, setViewDate] = useState(startOfMonth(new Date()));
  const [todos, setTodos] = useState({}); // { "2025-02-18": ["Task 1", "Task 2"] }

  // Load tasks
  useEffect(() => {
    const raw = localStorage.getItem(TODOS_KEY);
    if (raw) setTodos(JSON.parse(raw));
  }, []);

  function formatKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  const grid = useMemo(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const firstDay = start.getDay();
    const daysInMonth = end.getDate();

    const prev = [];
    if (firstDay > 0) {
      let prevEnd = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();
      for (let i = firstDay - 1; i >= 0; i--) {
        prev.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, prevEnd - i), inMonth: false });
      }
    }

    const curr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      curr.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth(), i), inMonth: true });
    }

    const all = [...prev, ...curr];
    while (all.length % 7 !== 0) {
      const nextIndex = all.length - prev.length - curr.length + 1;
      all.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, nextIndex), inMonth: false });
    }

    return all;
  }, [viewDate]);

  function isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  return (
    <div className="daily-routine-card calendar-card interactive-calendar">
      <div className="calendar-header">
        <div>
          <h2 style={{ margin: 0 }}>🗓️ Calendar</h2>
          <div style={{ color: "#555", fontSize: 13 }}>
            {viewDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="mini-btn" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>◀</button>
          <button className="mini-btn" onClick={() => setViewDate(startOfMonth(new Date()))}>Today</button>
          <button className="mini-btn" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>▶</button>
        </div>
      </div>

      <div className="month-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(w => (
          <div key={w} className="grid-head">{w}</div>
        ))}

        {grid.map((cell, idx) => {
          const d = cell.date;
          const key = formatKey(d);
          const hasTasks = todos[key] && todos[key].length > 0;

          return (
            <button
              key={idx}
              className={`day-cell ${cell.inMonth ? "in-month" : "out-month"} ${
                isSameDay(d, selectedDate) ? "today-cell" : ""
              }`}
              onClick={() => onDateChange(d)}
            >
              <div className="day-top">
                <div className="day-num">{d.getDate()}</div>
                {hasTasks && <div className="note-dot" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}