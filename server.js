// ─── server.js ─────────────────────────────────────────────────────────────
// Full Express + MongoDB backend for the MERN Todo App
// Run: npm install && npm run dev

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mern-todo";

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// ─── DB Connection ─────────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅  MongoDB connected"))
  .catch((err) => { console.error("❌  MongoDB error:", err); process.exit(1); });

// ─── Schema & Model ────────────────────────────────────────────────────────────
const todoSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true, trim: true, maxlength: 300 },
    completed: { type: Boolean, default: false },
    priority:  { type: String, enum: ["low", "medium", "high"], default: "medium" },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

// ─── Routes ────────────────────────────────────────────────────────────────────

// GET  /api/todos       — fetch all todos (sorted newest first)
app.get("/api/todos", async (req, res) => {
  try {
    const { filter, priority } = req.query;
    const query = {};
    if (filter === "active")    query.completed = false;
    if (filter === "completed") query.completed = true;
    if (priority)               query.priority  = priority;

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: todos.length, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/todos       — create a new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title, priority } = req.body;
    if (!title?.trim()) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }
    const todo = await Todo.create({ title: title.trim(), priority });
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET  /api/todos/:id   — get single todo
app.get("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found." });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/todos/:id  — partial update (toggle, edit title, change priority)
app.patch("/api/todos/:id", async (req, res) => {
  try {
    const allowed = ["title", "completed", "priority"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );
    if (updates.title) updates.title = updates.title.trim();

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true,
    });
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found." });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/todos/:id — delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found." });
    res.json({ success: true, message: "Todo deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/todos     — clear all completed todos
app.delete("/api/todos", async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 404 fallback
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found." }));

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀  Server running on http://localhost:${PORT}`));
