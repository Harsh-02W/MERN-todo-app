# MERN Todo App

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Manage your daily tasks efficiently with real-time updates and a responsive, modern interface.

## 🎯 Features

- **User Authentication**: Secure JWT-based authentication system
- **Task Management**: Create, read, update, and delete tasks with ease
- **Real-time Updates**: Socket.io integration for instant updates across clients
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **CSS** - Styling
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Socket.io** - WebSocket library

## 📋 Prerequisites

Before getting started, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (local or cloud instance)
- Git

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Harsh-02W/MERN-todo-app.git
cd MERN-todo-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory with the following variables:
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000`

### Start Frontend Server (in a new terminal)
```bash
cd frontend
npm start
```
The frontend application will open at `http://localhost:3000`

## 📖 Usage

1. Navigate to `http://localhost:3000` in your browser
2. Sign up or log in with your credentials
3. Add new tasks using the input field
4. Click on tasks to update or mark as complete
5. Delete tasks by clicking the delete button
6. Changes are automatically synchronized across all connected clients

## 🗂️ Project Structure

```
MERN-todo-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgments

- Inspired by modern task management applications
- Built with the MERN stack
- Thanks to the open-source community for amazing libraries and tools

## 📞 Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/Harsh-02W/MERN-todo-app/issues).

---

**Happy Task Managing! 🎉**