# Workflo - Trello-Style Task Management Application

## Project Overview
The Trello-Style Task Management Application is a web-based project management tool designed to help users manage tasks efficiently. This application provides user authentication, task boards, task management capabilities, drag-and-drop functionality, and data persistence. Users can sign up, log in, and manage their tasks in a visually organized manner with columns representing different task statuses.

## Features

### 1. User Authentication
- **Signup and Login**: Users can create an account using their email and password. They can log in to access their task board.
- **Secure Password Storage**: Passwords are securely stored using hashing techniques to ensure user data protection.
- **Session Management**: User sessions are managed to maintain logged-in states and ensure secure access.

### 2. Task Board
- **Personal Task Board**: Each user has a personal task board that is accessible upon logging in.
- **Columns**: The task board is divided into four columns:
  - **To-Do**
  - **In Progress**
  - **Under Review**
  - **Completed**

### 3. Task Management
- **Create Tasks**: Users can create new tasks in any column. Each task includes:
  - **Title** (mandatory)
  - **Description** (optional)
  - **Status** (mandatory, auto-filled based on the column where the task is created)
  - **Priority** (optional; values: Low, Medium, Urgent)
  - **Deadline** (optional)
- **Edit Tasks**: Users can edit existing tasks to update any task details.
- **Delete Tasks**: Users can delete tasks as needed.

### 4. Drag and Drop Functionality
- **Move Tasks**: Tasks can be dragged and dropped between columns to update their status visually.
- **Status Update**: When a task is moved to a different column, its status is automatically updated to reflect the new column.

### 5. Data Persistence
- **Database Storage**: All user data, including account information and tasks, is stored in a database.
- **User-specific Data**: Each user can only see and manage their own tasks, ensuring data privacy and security.

### 6. Additional Features
- **Search Tasks**: Allows users to search for specific tasks.
- **Filter Tasks**: Provides filtering options to view tasks based on certain criteria.
- **Calendar View**: An integrated calendar view to manage tasks with deadlines visually.

## Technologies Used
- **Front-end**: NextJs with TypeScript for building the user interface.
- **Back-end**: Node.js and Express.js for server-side logic and API handling.
- **Database**: MongoDB for data storage and retrieval.
- **Authentication**: JWT (JSON Web Tokens) for secure authentication and session management.
- **State Management**: Redux for managing application state.
- **Drag and Drop**: React inbuilt drop and drag features for implementing drag-and-drop functionality.
- **Utilities**: Different utils has been used for improved code management and user experience.
- **CSS Library**: AntD has been used  to design components like modal and drawer.

## Usage
- **Signup/Login**: Create an account or log in with your existing credentials.
- **Task Board**: View and manage your tasks in the To-Do, In Progress, Under Review, and Completed columns.
- **Create/Edit/Delete Tasks**: Add new tasks, edit existing ones, or delete tasks as needed.
- **Drag and Drop**: Drag tasks between columns to update their status visually.
- **Search/Filter/Sort Tasks**: Use the search and filter functionalities to find and organize tasks.

