# Todo App
<p align="center">
  <img src="https://github.com/Kalaba01/to-do-list/assets/130281220/50c7ee70-747a-4f39-935e-900b4671bf2f" alt="Website preview"/>
</p>

This project is a full-stack Todo application built using MERN stack. Users can add, edit, delete, and mark tasks as completed. Additional features include categorizing tasks, marking tasks as favorites, and filtering tasks based on category, completion status, and favorite status, uploading tasks from .csv file. The application also supports sharing the task list via email, reading tasks aloud using text-to-speech, and adapting its appearance based on the browser's light or dark mode settings. Furthermore, the application supports multi-language functionality, displaying text in the browser's default language.

## Project Architecture

The project backend is organized as follows:

```
api/                      # Main API folder
|-- config/               # Configuration-related files
|   |-- db.js             # Database configuration
|
|-- controllers/          # Controllers for handling requests
|   |-- todoController.js # Controller logic for handling todo operations
|
|-- models/               # Data models and schemas
|   |-- todo.js           # Schema definition for todo items
|
|-- routes/               # API route definitions
|   |-- todoRoutes.js     # API routes for todos
|
|-- services/             # Business logic and services
    |-- todoService.js    # Business logic and service functions for todos
app.js                    # Main application file, entry point of the backend
package.json              # Project metadata and dependencies

```

The project frontend is organized as follows:

```
app/                                # Main frontend project folder
|-- public/             
|
|-- src/                            # Source files for the frontend application
    |-- components/                 # React components
    |   |-- TodoApp/                # TodoApp component folder
    |   |   |-- TodoApp.css         # Styles for TodoApp component
    |   |   |-- TodoApp.js          # TodoApp component
    |   |
    |   |-- TodoCard/               # TodoCard component folder
    |   |   |-- TodoCard.css        # Styles for TodoCard component
    |   |   |-- TodoCard.js         # TodoCard component
    |   |
    |   |-- TodoContent/            # TodoContent component folder
    |   |   |-- TodoContent.css     # Styles for TodoContent component
    |   |   |-- TodoContent.js      # TodoContent component
    |   |
    |   |-- TodoEdit/              # TodoEdit component folder
    |   |   |-- TodoEdit.css       # Styles for TodoEdit component
    |   |   |-- TodoEdit.js        # TodoEdit component
    |   |
    |   |-- TodoFooter/            # TodoFooter component folder
    |   |   |-- TodoFooter.css     # Styles for TodoFooter component
    |   |   |-- TodoFooter.js      # TodoFooter component
    |   |
    |   |-- TodoForm/              # TodoForm component folder
    |   |   |-- TodoForm.css       # Styles for TodoForm component
    |   |   |-- TodoForm.js        # TodoForm component
    |   |
    |   |-- TodoInput/             # TodoInput component folder
    |   |   |-- TodoInput.css      # Styles for TodoInput component
    |   |   |-- TodoInput.js       # TodoInput component
    |   |
    |   |-- TodoList/              # TodoList component folder
    |   |   |-- TodoList.css       # Styles for TodoList component
    |   |   |-- TodoList.js        # TodoList component
    |   |
    |   |-- TodoUpload/            # TodoUpload component folder
    |   |   |-- TodoUpload.css     # Styles for TodoUpload component
    |   |   |-- TodoUpload.js      # TodoUpload component
    |   |
    |   |-- TodoWelcome/           # TodoWelcome component folder
    |       |-- TodoWelcome.css    # Styles for TodoWelcome component
    |       |-- TodoWelcome.js     # TodoWelcome component
    |
    |-- locales/                   # Localization files
    |   |-- en/                    # English localization
    |   |   |-- global.json        # English localization file
    |   |
    |   |-- fr/                    # French localization
    |   |   |-- global.json        # French localization file
    |   |
    |   |-- hi/                    # Hindi localization
    |   |   |-- global.json        # Hindi localization file
    |   |
    |   |-- zh/                    # Chinese localization
    |       |-- global.json        # Chinese localization file
    |
    |-- App.css                    # Global styles
    |-- App.js                     # Root component
    |-- index.js                   # Entry point of the application
    |-- reportWebVitals.js         # Performance measuring file
package.json                       # Project metadata and dependencies

```

## Pre-required installation

1) Node(20.12.2) - https://nodejs.org/en/download/package-manager/current

## Libraries and Third-Party Plugins

The following libraries and npm packages are used in this project:

1) cors(2.8.5) - Middleware for enabling CORS
2) express(4.19.2) - Web framework for Node.js
3) mongoDB(6.7.0) - Official MongoDB driver for Node.js
4) mongoose(8.4.1) - ODM library for MongoDB
5) uuid(9.0.1) - Generates unique identifiers (UUIDs)
6) axios(1.7.2) - HTTP client for making requests
7) i18next(23.11.5) - Internationalization framework
8) i18next-browser-languagedetector(8.0.0) - Detects user language in the browser
9) react-i18next(14.1.2) - React bindings for i18next
10) react(18.3.1) -  For making frontend
11) react-icons(5.2.1) - For using icons in the application
12) react-speech-kit - For reading tasks aloud
13) crypto-js (4.2.0) - Library of crypto standards
14) framer-motion (11.2.10) - A motion library for React
15) papaparse (5.4.1) - CSV parser for JavaScript
16) dotenv (16.4.5) - Loads environment variables from a .env file into process.env

## How to Start the Application

1) Clone the repository
```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
2) Install dependencies for the backend
Navigate to the api directory and install dependencies:
```
cd api
npm install
```
3) Start the backend server
```
npm start
```
The backend server will start and listen on the port 5000: http://localhost:5000

4) Install dependencies for the frontend
   
-Please make sure you have Node.js installed. Open a new terminal window, navigate to the app directory, and install dependencies:
```
cd app
npm install
```
5) Start the frontend development server
```
npm start
```

This will start the frontend development server and open the application in your default web browser. If it doesn't open automatically, navigate to http://localhost:3000 in your browser.

## Features:

1) Add Tasks - Users can add new tasks to their todo list
2) Edit Tasks - Users can edit existing tasks
3) Delete Tasks - Users can delete individual tasks
4) Delete All Tasks - Users can delete all tasks at once
5) Mark Tasks as Completed - Users can mark tasks as completed
6) Share Task List - Users can share their task list via email
7) Read Tasks Aloud - Users can use text-to-speech functionality to read tasks aloud
8) Favorite Tasks - Users can mark tasks as favorites
9) Categorize Tasks - Users can categorize their tasks into different categories
10) Filter Tasks - Users can filter tasks based on category, completion status, and whether they are marked as favorites
11) Timestamp Task - User can view when task was created and updated
12) Upload Tasks - User can add new task/s by uploading a .csv file
13) Light/Dark Mode - The application adjusts its appearance based on the browser's light or dark mode settings
14) Multi-language Support - The application displays text in the browser's default language
