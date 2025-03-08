# MindShire

**MindShire** is an innovative educational platform that seamlessly integrates healthcare topics into existing school curricula. It empowers educators to enhance student awareness and understanding of healthcare concepts through interactive lessons, quizzes, and multimedia content.

---

## Features

- 📚 **Curriculum Integration:** Aligns healthcare topics with core school subjects.
- 🎓 **Interactive Lessons:** Engaging content including videos, quizzes, and infographics.
- 👩‍🏫 **Teacher Dashboard:** Customizable modules, lesson assignments, and progress tracking.
- 🧑‍🎓 **Student Portal:** Access to lessons, assignments, and progress tracking.
- ☁️ **Cloud Database:** All data securely stored in **MongoDB Atlas**.
- ⚡ **Real-Time Updates:** Content delivery and student progress updates via backend API.

---

## Tech Stack

### Frontend
- ⚛️ React.js
- HTML, CSS
- JavaScript

### Backend
- 🟢 Node.js
- 🚀 Express.js

### Database
- 🗄️ MongoDB Atlas (Cloud Database)

---

## Installation

### Prerequisites

- Node.js installed
- MongoDB Atlas account for database connection
- Git for cloning the repository

---

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/MindShire.git
    cd MindShire
    ```

2. **Backend Setup:**
    - Navigate to the backend directory:
        ```bash
        cd backend
        ```
    - Install backend dependencies:
        ```bash
        npm install
        ```
    - Create a `.env` file inside the `backend` directory and add the following:
        ```
        MONGO_URI=your_mongodb_atlas_connection_string
        PORT=5000
        ```
    - Start the backend server:
        ```bash
        npm start
        ```

3. **Frontend Setup:**
    - Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    - Install frontend dependencies:
        ```bash
        npm install
        ```
    - Start the frontend server:
        ```bash
        npm start
        ```
    - Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Usage

1. **Sign Up or Log In** as either a teacher or student.
2. **For Teachers:**
    - Add healthcare modules to school subjects.
    - Assign lessons and quizzes.
    - Monitor student progress via the dashboard.
3. **For Students:**
    - Access assigned lessons and complete quizzes.
    - Track personal progress and performance.
    - Explore additional healthcare resources.

---

## Contributing

We welcome contributions! To contribute, please fork the repository, create a new branch, and submit a pull request.

---

## Contact

For any inquiries or support, please contact:  
📧 shraddha.shenoy2004@gmail.com

---

