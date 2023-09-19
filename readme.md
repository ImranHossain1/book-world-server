# Book World Server

This is the backend server for the Book World application, built with MongoDB, Node.js, and ReactJS.

**Root API Endpoint**: [https://book-world-server.vercel.app/api/v1/](https://book-world-server.vercel.app/api/v1/)

**Live Client Site Link**: [https://mydream-book-store.netlify.app/](https://mydream-book-store.netlify.app/)

**GitHub Client Site Link**: [https://github.com/ImranHossain1/book-store-client](https://github.com/ImranHossain1/book-store-client)

**GitHub Server Site Link**: [https://github.com/ImranHossain1/book-world-server](https://github.com/ImranHossain1/book-world-server)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Book World Server serves as the backend for the Book World application. It provides the necessary APIs and services for the client-side application to function. This server handles user authentication, book data storage and more.

## Features

- User Authentication: Secure user registration and login.
- Book Management: Create, update, and delete book data.
- User Management: Manage user data and profiles.
- API Endpoints: Access various API endpoints for the Book World client application.

## Getting Started

Follow these instructions to set up and run the server locally or deploy it to your preferred hosting platform.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- MongoDB: Set up a MongoDB database for storing application data.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/book-world-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-world-server
   ```

3. Install the required dependencies:

```bash
npm install
```

4. Create a .env file in the root directory with the following environment variables:

```NODE_ENV = development
PORT = 5000
DATABASE_URL= mongodb+srv://yourdb:dbPass@cluster0.tuwxhwy.mongodb.net/?retryWrites=true&w=majority


BCRYPT_SALT_ROUNDS = 12

JWT_SECRET = 'your_own_secret'
JWT_EXPIRERS_IN= 1d
JWT_REFRESH_SECRET = 'your-refresh-secret'
JWT_REFRESH_EXPIRES_IN = 365d

```

Replace your_mongodb_connection_uri with your MongoDB connection URI and your_secret_key with a secret key for JWT token generation.

5. Start the server:

   ````bash
   npm run start```
   ````

   ## Usage

Use the provided API endpoints to interact with the server. You can integrate this backend with the Book World client-side application or any other application that requires a backend service.

## Project Structure

The project structure is organized as follows:

- `/src`: Contains the application's source code.
  - `/models`: MongoDB models for data schemas.
  - `/routes`: Defines API routes and controllers.
  - `/middlewares`: Custom middleware functions.
- `server.js`: Main server file.
- `.env`: Environment variables file (create this file as mentioned in the Installation section).
- `package.json`: Dependencies and scripts.
- `README.md`: Project documentation.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Mongoose (ODM for MongoDB)
- Other Node.js packages for various functionalities.
