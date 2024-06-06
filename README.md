# Todo App

This project is a full-stack Todo application built using MERN stack. Users can add, edit, delete, and mark tasks as completed. Additional features include categorizing tasks, marking tasks as favorites, and filtering tasks based on category, completion status, and favorite status. The application also supports sharing the task list via email, reading tasks aloud using text-to-speech, and adapting its appearance based on the browser's light or dark mode settings. Furthermore, the application supports multi-language functionality, displaying text in the browser's default language.

## Project Architecture

The project backend is organized as follows:

```
api/
├── config/                     # Configuration directory
│   └── db.js                   # Database configuration file
├── controllers/                # Controllers directory
│   └── todoController.js       # Controller for handling logic related to 'todo' operations
├── models/                     # Models directory
│   └── todo.js                 # Mongoose model for 'todo' items
├── routes/                     # Routes directory
│   └── todoRoutes.js           # Router file defining routes for 'todo' operations
├── app.js                      # Main application file
├── package-lock.json           # Automatically generated file that records the exact versions of installed packages
└── package.json                # File containing metadata about the application and a list of dependencies
```

The project frontend is organized as follows:

```
app/
├── public                  
│   ├── index.html
│   └── ...
├── src/                       # Main directory for the application's source code
│   ├── components/            # Directory for all React components of the application
│   │   ├── TodoApp/           # Component for the main application
│   │   │   ├── TodoApp.css    # Styles for the `TodoApp` component
│   │   │   └── TodoApp.js     # JavaScript code for the `TodoApp` component
│   │   ├── TodoCard/          # Component for displaying individual task items
│   │   │   ├── TodoCard.css   # Styles for the `TodoCard` component
│   │   │   └── TodoCard.js    # JavaScript code for the `TodoCard` component
│   │   ├── TodoEdit/          # Component for editing task items
│   │   │   ├── TodoEdit.css   # Styles for the `TodoEdit` component
│   │   │   └── TodoEdit.js    # JavaScript code for the `TodoEdit` component
│   │   ├── TodoFooter/        # Component for the application's footer
│   │   │   ├── TodoFooter.css # Styles for the `TodoFooter` component
│   │   │   └── TodoFooter.js  # JavaScript code for the `TodoFooter` component
│   │   ├── TodoForm/          # Component for the form to add new tasks
│   │   │   ├── TodoForm.css   # Styles for the `TodoForm` component
│   │   │   └── TodoForm.js    # JavaScript code for the `TodoForm` component
│   │   ├── TodoList/          # Component for displaying the list of tasks
│   │   │   ├── TodoList.css   # Styles for the `TodoList` component
│   │   │   └── TodoList.js    # JavaScript code for the `TodoList` component
│   ├── locales/               # Directory for localization files
│   │   ├── en/                # Localization for English language
│   │   │   └── global.json    # Translation file for English
│   │   ├── fr/                # Localization for French language
│   │   │   └── global.json    # Translation file for French
│   │   ├── hi/                # Localization for Hindi language
│   │   │   └── global.json    # Translation file for Hindi
│   │   └── zh/                # Localization for Chinese language
│   │       └── global.json    # Translation file for Chinese
│   ├── App.css                # Main CSS file for the application
│   ├── App.js                 # Main React component of the application
│   ├── index.js               # Entry point for the application
│   └── reportWebVitals.js     # File for measuring the performance of the application
├── .gitignore                 # File specifying which files and directories Git should ignore
├── LICENSE                    # License file for the application
├── package-lock.json          # Automatically generated file that records the exact versions of installed packages
└── package.json               # File containing metadata about the application and a list of dependencies
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
   
-Make sure you have Node.js installed. Open a new terminal window, navigate to the app directory, and install dependencies:
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
11) Light/Dark Mode - The application adjusts its appearance based on the browser's light or dark mode settings
12) Multi-language Support - The application displays text in the browser's default language
