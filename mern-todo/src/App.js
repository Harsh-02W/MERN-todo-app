import { useState, useEffect, useRef } from "react";

// ─── Mock API (simulates Express + MongoDB) ───────────────────────────────────
const BASE = "http://localhost:5000/api/todos";
const api = {
  getAll: () => fetch(BASE).then(r => r.json()).then(r => r.data),
  create: (data) => fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(r => r.data),
  update: (id, patch) => fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  }).then(r => r.json()).then(r => r.data),
  remove: (id) => fetch(`${BASE}/${id}`, { method: "DELETE" })
};


// ─── Styles ───────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');`;

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d0d0d;
    --surface: #161616;
    --surface2: #1f1f1f;
    --border: #2a2a2a;
    --accent: #c8f464;
    --accent2: #ff6b35;
    --text: #f0f0f0;
    --muted: #666;
    --danger: #ff4757;
    --low: #64b5f6;
    --med: #ffb74d;
    --high: #ef5350;
    --r: 12px;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; }

  .app { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }

  .header { margin-bottom: 48px; }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .logo { font-size: 11px; font-family: 'DM Mono', monospace; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; }
  .title { font-size: clamp(38px, 8vw, 64px); font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
  .title span { color: var(--accent); }
  .subtitle { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--muted); margin-top: 10px; }

  .stats { display: flex; gap: 24px; margin-top: 28px; }
  .stat { }
  .stat-val { font-size: 28px; font-weight: 700; line-height: 1; }
  .stat-val.accent { color: var(--accent); }
  .stat-label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }

  .add-form { display: flex; flex-direction: column; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 20px; margin-bottom: 32px; }
  .add-form-row { display: flex; gap: 10px; }
  .input { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 16px; color: var(--text); font-family: 'Syne', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; flex: 1; }
  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--muted); }
  select.input { cursor: pointer; }
  .btn { border: none; border-radius: 8px; padding: 12px 20px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .btn-primary { background: var(--accent); color: #0d0d0d; }
  .btn-primary:hover { background: #d6ff70; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 6px 16px; font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted); cursor: pointer; transition: all 0.15s; }
  .filter-btn.active { background: var(--accent); border-color: var(--accent); color: #0d0d0d; font-weight: 500; }
  .filter-btn:hover:not(.active) { border-color: #444; color: var(--text); }

  .todo-list { display: flex; flex-direction: column; gap: 8px; }

  .todo-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 16px 18px; display: flex; align-items: center; gap: 14px; transition: all 0.2s; animation: slideIn 0.25s ease; }
  .todo-item:hover { border-color: #333; background: #1a1a1a; }
  .todo-item.done { opacity: 0.45; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }

  .check-btn { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border); background: transparent; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .check-btn:hover { border-color: var(--accent); }
  .check-btn.checked { background: var(--accent); border-color: var(--accent); }
  .check-icon { color: #0d0d0d; font-size: 12px; font-weight: 800; }

  .todo-content { flex: 1; min-width: 0; }
  .todo-title { font-size: 15px; font-weight: 600; line-height: 1.4; transition: all 0.2s; }
  .todo-item.done .todo-title { text-decoration: line-through; }
  .todo-meta { display: flex; align-items: center; gap: 10px; margin-top: 5px; }
  .priority-badge { font-family: 'DM Mono', monospace; font-size: 10px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; }
  .priority-low { background: rgba(100, 181, 246, 0.12); color: var(--low); }
  .priority-medium { background: rgba(255, 183, 77, 0.12); color: var(--med); }
  .priority-high { background: rgba(239, 83, 80, 0.12); color: var(--high); }
  .todo-date { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); }

  .todo-actions { display: flex; gap: 6px; opacity: 0; transition: opacity 0.15s; }
  .todo-item:hover .todo-actions { opacity: 1; }
  .icon-btn { width: 30px; height: 30px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all 0.15s; }
  .icon-btn:hover.edit { border-color: var(--accent); color: var(--accent); }
  .icon-btn:hover.del { border-color: var(--danger); color: var(--danger); }

  .edit-input { background: var(--surface2); border: 1px solid var(--accent); border-radius: 6px; padding: 6px 10px; color: var(--text); font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 600; outline: none; width: 100%; }

  .empty { text-align: center; padding: 64px 24px; color: var(--muted); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-text { font-family: 'DM Mono', monospace; font-size: 13px; }

  .loading { text-align: center; padding: 48px; }
  .spinner { width: 28px; height: 28px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .progress-bar { height: 3px; background: var(--border); border-radius: 2px; margin-top: 16px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #a8e063); border-radius: 2px; transition: width 0.4s ease; }

  .clear-btn { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted); background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: color 0.15s; }
  .clear-btn:hover { color: var(--danger); }
  .filters-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// ─── Components ───────────────────────────────────────────────────────────────

function CheckButton({ checked, onClick }) {
  return (
    <button className={`check-btn ${checked ? "checked" : ""}`} onClick={onClick} aria-label="toggle">
      {checked && <span className="check-icon">✓</span>}
    </button>
  );
}

function PriorityBadge({ priority }) {
  return <span className={`priority-badge priority-${priority}`}>{priority}</span>;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const handleEditSave = () => {
    if (val.trim() && val.trim() !== todo.title) onEdit(todo._id, val.trim());
    setEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "done" : ""}`}>
      <CheckButton checked={todo.completed} onClick={() => onToggle(todo._id)} />
      <div className="todo-content">
        {editing ? (
          <input
            ref={inputRef}
            className="edit-input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => { if (e.key === "Enter") handleEditSave(); if (e.key === "Escape") setEditing(false); }}
          />
        ) : (
          <div className="todo-title">{todo.title}</div>
        )}
        <div className="todo-meta">
          <PriorityBadge priority={todo.priority} />
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button className="icon-btn edit" onClick={() => setEditing(true)} title="Edit">✎</button>
        <button className="icon-btn del" onClick={() => onDelete(todo._id)} title="Delete">✕</button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");

  // Fetch on mount
  useEffect(() => {
    api.getAll().then((data) => { setTodos(data); setLoading(false); });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    const newTodo = await api.create({ title: title.trim(), priority });
    setTodos((prev) => [newTodo, ...prev]);
    setTitle("");
    setAdding(false);
  };

  const handleToggle = async (id) => {
    const todo = todos.find((t) => t._id === id);
    const updated = await api.update(id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await api.remove(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = async (id, newTitle) => {
    const updated = await api.update(id, { title: newTitle });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const clearCompleted = async () => {
    const completed = todos.filter((t) => t.completed);
    await Promise.all(completed.map((t) => api.remove(t._id)));
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "high") return t.priority === "high";
    return true;
  });

  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;
  const active = total - done;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <style>{FONTS + css}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <span className="logo">// MERN Todo v1.0</span>
          </div>
          <h1 className="title">Get it<br /><span>done.</span></h1>
          <p className="subtitle">MongoDB · Express · React · Node</p>

          <div className="stats">
            <div className="stat">
              <div className="stat-val accent">{active}</div>
              <div className="stat-label">Remaining</div>
            </div>
            <div className="stat">
              <div className="stat-val">{done}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat">
              <div className="stat-val">{total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </header>

        {/* Add Form */}
        <form className="add-form" onSubmit={handleAdd}>
          <div className="add-form-row">
            <input
              className="input"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="add-form-row">
            <select className="input" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button className="btn btn-primary" type="submit" disabled={adding || !title.trim()}>
              {adding ? "Adding…" : "+ Add Task"}
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="filters-row">
          <div className="filters">
            {["all", "active", "completed", "high"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {done > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>Clear completed</button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">◎</div>
            <div className="empty-text">
              {filter === "all" ? "No tasks yet — add one above." : `No ${filter} tasks.`}
            </div>
          </div>
        ) : (
          <div className="todo-list">
            {filtered.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

