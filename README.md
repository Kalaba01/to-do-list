# Todo App

This project is a simple Todo application built with React. Users can add, edit, delete, and mark tasks as completed. The application also includes functionality for sharing the task list via email and reading tasks aloud.

## Project Architecture

The project is organized as follows:

src/
    components/ - Contains all the React components that make up the application, including the main app component, the form for adding tasks, the list of tasks, individual task cards, the edit task form, and the footer
        
    styles/- Contains the CSS files for styling the respective React components

## How to Start the Application

1) Clone the repository

### git clone https://github.com/your-username/todo-app.git
### cd todo-app

2) Install dependencies

Make sure you have Node.js installed. Then, run:

### npm install

3) Start the application

### npm start

This will start the development server and open the application in your default web browser. If it doesn't open automatically, navigate to http://localhost:3000 in your browser.

## Libraries and Third-Party Plugins

The following libraries and npm packages are used in this project:

-uuid - For generating unique IDs for tasks
-react-icons - For using icons in the application
-react-speech-kit - For reading tasks aloud
