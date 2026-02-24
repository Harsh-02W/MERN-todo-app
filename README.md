# MERN Todo App

A full-stack Todo application built with the **MERN** stack:

- **MongoDB** for persistence
- **Express** + **Node.js** for the REST API
- **React** for the frontend UI

The app supports creating, editing, completing, filtering, and deleting todos with priority levels.

## Project Structure

```text
.
├── server.js               # Express + Mongoose backend API
├── package.json            # Backend dependencies/scripts
├── todo-app.jsx            # Standalone mock/demo React todo component
└── mern-todo/              # React frontend app (Create React App)
    ├── package.json
    ├── public/
    └── src/
```

## Features

- Create todos with a priority (`low`, `medium`, `high`)
- Mark todos complete/incomplete
- Edit todo titles inline
- Delete individual todos
- Filter by:
  - All
  - Active
  - Completed
  - High priority
- Progress/stats display (remaining/completed/total)
- MongoDB-backed persistence via REST API

## Tech Stack

### Backend

- Node.js
- Express 5
- Mongoose
- CORS
- dotenv

### Frontend

- React (Create React App)
- Fetch API for backend communication

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB (local instance or remote URI)

## Environment Variables

Create a `.env` file in the project root (same level as `server.js`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo
CLIENT_ORIGIN=http://localhost:3000
```

If these are not set, the app falls back to the same defaults shown above.

## Installation

Install backend dependencies (root):

```bash
npm install
```

Install frontend dependencies:

```bash
cd mern-todo
npm install
```

## Running the App (Development)

### 1) Start the backend

From the repository root:

```bash
npm start
```

Backend runs on `http://localhost:5000` by default.

### 2) Start the frontend

In another terminal:

```bash
cd mern-todo
npm start
```

Frontend runs on `http://localhost:3000` by default.

## API Endpoints

Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint        | Description |
|--------|-----------------|-------------|
| GET    | `/`             | Get all todos (supports `filter` and `priority` query params) |
| POST   | `/`             | Create a todo |
| GET    | `/:id`          | Get one todo by ID |
| PATCH  | `/:id`          | Update `title`, `completed`, or `priority` |
| DELETE | `/:id`          | Delete one todo |
| DELETE | `/`             | Delete all completed todos |

### Example requests

Create todo:

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Ship README","priority":"high"}'
```

Get only active todos:

```bash
curl "http://localhost:5000/api/todos?filter=active"
```

## Scripts

### Root (backend)

- `npm start` — run backend with nodemon

### `mern-todo/` (frontend)

- `npm start` — run React dev server
- `npm test` — run tests
- `npm run build` — production build

## Notes

- The frontend in `mern-todo/src/App.js` calls `http://localhost:5000/api/todos` directly.
- `todo-app.jsx` contains a self-contained mock-data version of the todo UI and is useful as a standalone component/demo.

## License

ISC
