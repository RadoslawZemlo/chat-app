# Chat App

Chat app built using MERN stack

## Table of Contents

1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Screenshots](#screenshots)
4. [Features](#features)
5. [Installation](#installation)

## General Info

Chat App is a full-stack messaging application that includes users' authentification functionality. This application's backend is built utilizing express as a node framework and MongoDB as a database to store messages and users' data. Additionally, for modeling and mapping data mongoose is used, while jsonwebtoken is employed for generating JWTs used by users' authentication. Whereas to build a frontend of the application React is used.

The purpose of building this project is to consolidate React's knowledge and acquire a basic understanding of backend and database working.

Check demo of the app deployed on heroku: https://chat-app-57.herokuapp.com/

### Screenshots

<img width="350" alt="chat-app" src="https://user-images.githubusercontent.com/95445412/152177442-901a49c0-9f9b-402b-9257-4a014c4a7cab.png"> <img width="350" alt="chat-auth" src="https://user-images.githubusercontent.com/95445412/152177453-06af1391-958f-427d-b96f-c417f8fe7282.png">
<br/>
<img width="350" alt="chat-home" src="https://user-images.githubusercontent.com/95445412/152177458-e3d48041-a26a-484c-8950-2589fd0c8419.png"> <img width="350" alt="chat-users" src="https://user-images.githubusercontent.com/95445412/152177460-36785387-6296-425a-b50d-a4a9a8159d2b.png">

## Technologies

- [Node](https://nodejs.org/en/) version: 16.3.0
- [Express](https://expressjs.com/) version: 4.17.1
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) version: 8.5.1
- [mongoose](https://mongoosejs.com/) version: 6.1.1
- [React](https://reactjs.org/) version: 17.0.2
- [React Router](https://reactrouterdotcom.fly.dev/) version: 6.1.1

## Features

- Register and login users
- Authentication using JWT Tokens
- Save and retrieve messages from MongoDB
- A Global Chat where all users can messaging together

### To Do

- Add socket.io for realtime messaging
- Add private messaging between two users of chat
- Add functionality to creating conversations between group of users

## Installation

In order to get a copy of this project and run it locally, first of all, make sure you already have node and npm installed.

Clone this repository

```bash
git clone https://github.com/RadoslawZemlo/chat-app.git
```

In a root directory of the project create a .env file and add those variables

```
NODE_ENV=development
PORT=5000
MONGO_URI=your mongodb uri
JWT_SECRET=your jwt secret
```

Then install dependencies for a server

```bash
cd chat-app
npm install
```

and a client

```bash
cd chat-app/client
npm install
```

Once the dependencies are installed, run server from a root directory

```bash
node server.js
```

This will start a server on **localhost:5000**.

Then in a client directory run

```bash
npm start
```

Then you will have access to the application on **localhost:3000**
