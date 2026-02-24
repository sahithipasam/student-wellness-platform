import React, { useState, useEffect } from "react";
import "../Pages/DailyRoutine.css";

const TODOS_KEY = "calendar_todos_v2";

export default function TodoList({ selectedDate }) {
  const [todos, setTodos] = useState({});
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(TODOS_KEY);
    if (raw) {
      try {
        setTodos(JSON.parse(raw));
      } catch {
        setTodos({});
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  function formatKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  const key = formatKey(selectedDate);
  const tasksForDate = todos[key] || []; // each item: { text: string, done: boolean }

  function addTask(e) {
    e.preventDefault();
    const text = taskText.trim();
    if (!text) return;

    const updatedList = [...tasksForDate, { text, done: false }];
    setTodos(prev => ({ ...prev, [key]: updatedList }));
    setTaskText("");
  }

  function deleteTask(idx) {
    const updatedList = tasksForDate.filter((_, i) => i !== idx);
    setTodos(prev => ({ ...prev, [key]: updatedList }));
  }

  function toggleDone(idx) {
    const updatedList = tasksForDate.map((t, i) =>
      i === idx ? { ...t, done: !t.done } : t
    );
    setTodos(prev => ({ ...prev, [key]: updatedList }));
  }

  return (
    <div className="daily-routine-card todo-card">
      <h3>Tasks for {selectedDate.toDateString()}</h3>

      <form onSubmit={addTask} className="todo-form">
        <input
          className="todo-input"
          placeholder="Add a task..."
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {tasksForDate.length === 0 && (
          <li className="todo-empty">No tasks for this date ✨</li>
        )}

        {tasksForDate.map((t, idx) => (
          <li
            key={idx}
            className={`todo-item ${t.done ? "done" : ""}`}
          >
            <label style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(idx)}
              />
              <span className="todo-text" style={{ flex: 1 }}>
                {t.text}
              </span>
            </label>

            <button
              className="btn btn-link btn-delete"
              onClick={() => deleteTask(idx)}
              aria-label="delete"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}