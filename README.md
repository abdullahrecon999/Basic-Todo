# Task Manager App

A simple task management application built with React and Node.js.

## Table of Contents

- [Task Manager App](#task-manager-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Tests](#tests)
  - [Backend](#backend)
  - [Frontend](#frontend)

## Introduction

The Task Manager App is a web-based application that allows users to manage their tasks. It was part of Cowlar interview Task.

## Features

- Create new tasks with a description.
- Mark tasks as completed or incomplete.
- Reorder tasks using drag-and-drop functionality.
- Delete tasks.

## Technologies

The Task Manager App is built using the following technologies:

- Frontend:
  - React: JavaScript library for building user interfaces.
  - Ant Design: UI framework for React applications.
  - React DnD: Drag-and-drop library for React.
  - Axios: HTTP client for making API requests.
  - HTML5 and CSS3: Markup and styling.

- Backend:
  - Node.js: JavaScript runtime for server-side development.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing task data.

## Getting Started

To get started with the Task Manager App, follow these steps:

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/task-manager-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd task-manager-app
   ```

3. Install the dependencies for the frontend:

   ```shell
   cd frontend
   npm install
   ```

4. Install the dependencies for the backend:

   ```shell
   cd ../backend
   npm install
   ```

### Usage

1. Start the frontend development server:

   ```shell
   cd frontend
   npm start
   ```

   This will start the frontend app on `http://localhost:3000`.

2. Start the backend server:

   ```shell
   cd backend
   npm start
   ```

   This will start the backend server on `http://localhost:3000`.

3. Open your web browser and visit `http://localhost:5173` to access the Task Manager App.

## Tests
To run the tests, follow these steps:
1. Add .env file with the following:
   
   ```
   MONGOURI=mongodb://
   MONGOURI_TEST=mongodb://
   ```

2. Navigate to the project directory:

   ```shell
   cd Basic-Todo/backend
   ```
3. Run the tests:

   ```shell
   npm test
   ```

## Backend

The backend of the Task Manager App is built with Node.js and Express.js. It provides the APIs required for task management, including creating, updating, and deleting tasks. The backend server interacts with a MongoDB database to store and retrieve task data.

## Frontend

The frontend of the Task Manager App is built with React and Ant Design. It provides a user-friendly interface for managing tasks. The frontend communicates with the backend server through RESTful APIs to perform CRUD operations on tasks.