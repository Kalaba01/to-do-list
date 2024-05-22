# Todo App

This project is a simple Todo application built with React. Users can add, edit, delete, and mark tasks as completed. The application also includes functionality for sharing the task list via email and reading tasks aloud.

## Project Architecture

The project is organized as follows:
```
.
├── public                  
│   ├── index.html
│   └── ...
├── src                     # Source files
│   ├── components          # React components
│   │   ├── TodoApp.js      # Main app component
│   │   ├── TodoForm.js     # Form for adding tasks
│   │   ├── TodoList.js     # List of tasks
│   │   ├── TodoCard.js     # Individual task card
│   │   ├── TodoEdit.js     # Form for editing tasks
│   │   ├── TodoFooter.js   # Footer component
│   │   └── ...
│   ├── styles              # CSS files for styling components
│   │   ├── TodoApp.css     # Styles for TodoApp component
│   │   ├── TodoForm.css    # Styles for TodoForm component
│   │   ├── TodoList.css    # Styles for TodoList component
│   │   ├── TodoCard.css    # Styles for TodoCard component
│   │   ├── TodoEdit.css    # Styles for TodoEdit component
│   │   ├── TodoFooter.css  # Styles for TodoFooter component
│   │   └── ...
│   ├── index.js            # Entry point of the application
│   ├── App.js              # Main App component
│   └── ...
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## How to Start the Application

1) Clone the repository
```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
2) Install dependencies

Make sure you have Node.js installed. Then, run:
```
npm install
```
3) Start the application
```
npm start
```
This will start the development server and open the application in your default web browser. If it doesn't open automatically, navigate to http://localhost:3000 in your browser.

## Features:

1) Add Tasks - Users can add new tasks to their todo list.
2) Edit Tasks - Users can edit existing tasks.
3) Delete Tasks - Users can delete individual tasks.
4) Delete All Tasks - Users can delete all tasks at once.
5) Mark Tasks as Completed - Users can mark tasks as completed.
6) Share Task List - Users can share their task list via email.
7) Read Tasks Aloud - Users can use text-to-speech functionality to read tasks aloud.
8) Undo Deletions - Users can undo task deletions using CTRL+Z, restoring either a single deleted task or all tasks if they were all deleted at once.

## Libraries and Third-Party Plugins

The following libraries and npm packages are used in this project:

1) uuid - For generating unique IDs for tasks
2) react-icons - For using icons in the application
3) react-speech-kit - For reading tasks aloud
