# MERN Todo App

## Project Overview

The MERN Todo App is a simple yet effective application that allows users to manage their daily tasks. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this application provides a modern, interactive interface for task management.

## Features
- User authentication using JWT
- Create, read, update, and delete tasks
- Responsive design for mobile and desktop
- Real-time updates using Socket.io

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**
```bash
git clone https://github.com/Harsh-02W/MERN-todo-app.git
```

2. **Navigate to the project directory**
```bash
cd MERN-todo-app
```

3. **Install the backend dependencies**
```bash
cd backend
npm install
```

4. **Install the frontend dependencies**
```bash
cd ../frontend
npm install
```

5. **Set up environment variables**
- Create a `.env` file in the `backend` directory to configure your MongoDB URI and JWT secret. Example:
```
MONGODB_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
```

6. **Run the application**
- Start the backend server:
```bash
cd backend
npm start
```
- Start the frontend server:
```bash
cd ../frontend
npm start
```

## Usage
After starting both servers, navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by modern task management applications.
- Powered by the MERN stack.

