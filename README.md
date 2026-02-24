# MERN Todo App

A full-stack todo application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a complete workflow for creating, reading, updating, and deleting todos with priority levels and completion tracking.

## 🌟 Features

- ✅ **Create Todos** - Add new todos with title and priority level
- 📝 **Edit Todos** - Update todo titles and change priority levels
- ✔️ **Mark Complete** - Toggle completion status of todos
- 🗑️ **Delete Todos** - Remove individual todos or clear all completed ones
- 🔍 **Filter Todos** - View all, active, or completed todos
- 📊 **Priority Levels** - Organize todos by low, medium, or high priority
- 🕐 **Timestamps** - Track creation and update times for each todo
- 🔄 **Real-time Updates** - Instant reflection of changes across the app
- 🛡️ **CORS Enabled** - Secure communication between frontend and backend

## 🏗️ Project Structure

```
MERN-todo-app/
├── server.js                 # Express backend server
├── package.json             # Backend dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── mern-todo/              # React frontend
    ├── package.json        # Frontend dependencies
    ├── public/             # Public assets
    └── src/                # React source code
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework (v5.2.1)
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling (v9.2.2)
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment configuration

### Frontend
- **React** - UI library (v19.2.4)
- **React DOM** - React rendering
- **React Scripts** - Build and development tools

### Development
- **Nodemon** - Auto-restart server on file changes
- **Testing Library** - Testing utilities

## 📋 API Endpoints

### GET `/api/todos`
Fetch all todos with optional filtering.

**Query Parameters:**
- `filter` (optional): "active" or "completed" to filter by status
- `priority` (optional): "low", "medium", or "high" to filter by priority

**Response:**
```
{
  "success": true,
  "count": 5,
  "data": [...] 
}
```

### POST `/api/todos`
Create a new todo.

**Request Body:**
```
{
  "title": "Buy groceries",
  "priority": "medium"
}
```

**Response:**
```
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Buy groceries",
    "completed": false,
    "priority": "medium",
    "createdAt": "2026-02-24T...",
    "updatedAt": "2026-02-24T..."
  }
}
```

### GET `/api/todos/:id`
Get a single todo by ID.

**Response:**
```
{
  "success": true,
  "data": {...}
}
```

### PATCH `/api/todos/:id`
Update a todo (title, completion status, or priority).

**Request Body:**
```
{
  "title": "Updated title",
  "completed": true,
  "priority": "high"
}
```

**Response:**
```
{
  "success": true,
  "data": {...}
}
```

### DELETE `/api/todos/:id`
Delete a single todo by ID.

**Response:**
```
{
  "success": true,
  "message": "Todo deleted."
}
```

### DELETE `/api/todos`
Clear all completed todos.

**Response:**
```
{
  "success": true,
  "deleted": 3
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harsh-02W/MERN-todo-app.git
   cd MERN-todo-app
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-todo
   PORT=5000
   CLIENT_ORIGIN=http://localhost:3000
   ```

4. **Start the backend server:**
   ```bash
   npm run start
   ```
   
   The server will run on `http://localhost:5000` and automatically restart with file changes (thanks to Nodemon).

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd mern-todo
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The app will open on `http://localhost:3000`.

### Running Both Services

You can run both backend and frontend simultaneously in separate terminal windows:

**Terminal 1 (Backend):**
```
npm run start
```

**Terminal 2 (Frontend):**
```
cd mern-todo
npm start
```

## 📦 Installation Details

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.2.2 | MongoDB ODM |
| cors | ^2.8.6 | Enable CORS |
| dotenv | ^17.3.1 | Environment variables |
| nodemon | ^3.1.14 | Auto-restart during development |

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI library |
| react-dom | ^19.2.4 | React rendering |
| react-scripts | 5.0.1 | Build tooling |
| @testing-library/react | ^16.3.2 | React testing |
| web-vitals | ^2.1.4 | Performance metrics |

## 🗄️ Database Schema

### Todo Model

```
{
  _id: ObjectId,
  title: String (required, max 300 characters),
  completed: Boolean (default: false),
  priority: String (enum: ["low", "medium", "high"], default: "medium"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## 📝 Available Scripts

### Backend

- `npm run start` - Start the server with Nodemon (auto-reload enabled)
- `npm test` - Run tests (currently not configured)

### Frontend

- `npm start` - Run the development server
- `npm run build` - Create a production build
- `npm test` - Run tests in watch mode
- `npm run eject` - Eject from create-react-app (irreversible)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Default | Description |
|----------|---------|-------------|
| MONGO_URI | mongodb://localhost:27017/mern-todo | MongoDB connection string |
| PORT | 5000 | Server port |
| CLIENT_ORIGIN | http://localhost:3000 | Frontend URL for CORS |

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running locally or check your MongoDB Atlas credentials
- Ensure `MONGO_URI` in `.env` is correct
- Check that your MongoDB user has proper permissions

### CORS Error
- Ensure `CLIENT_ORIGIN` in `.env` matches your frontend URL
- Verify the frontend is running on the correct port

### Port Already in Use
- Change the `PORT` in `.env` to an available port
- Or kill the process using the port:
  - **Mac/Linux:** `lsof -i :5000` then `kill -9 <PID>`
  - **Windows:** `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

## 📈 Future Enhancements

- User authentication and authorization
- Todo categories/labels
- Due dates and reminders
- Recurring todos
- Dark mode
- Local storage backup
- Export todos as CSV/PDF
- Collaborative editing

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 👤 Author

Created by [Harsh-02W](https://github.com/Harsh-02W)

## 📞 Support

If you encounter any issues or have questions, please open an [GitHub Issue](https://github.com/Harsh-02W/MERN-todo-app/issues).

---

**Happy Coding! 🎉**