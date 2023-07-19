const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// const http = require('http').Server(app)
const cors = require('cors');


// app.use(cors)

//WEBSOCKET SERVER
// const socketIO = require('socket.io')(http, {
//   cors: {
//     origin: 'http://127.0.0.1:8080',
//     credentials: true
//   },
// });

// socketIO.on('connection', (socket) => {
//   console.log('user connected', socket.id);
//   // socket.on('custom-event', (item) => {
//   //   console.log(item);
//   // });

// });

// Routers
const techRouter = require(path.join(__dirname, '/src/routes/techRouter'));
const postRouter = require(path.join(__dirname, '/src/routes/postRouter'));
const userRouter = require(path.join(__dirname, '/src/routes/userRouter'));

// Parse incoming JSON, static reqeusts, forms, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./dist'));

// API router for server handling of db info
app.use('/api/tech', techRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// Default unknown page handler
app.use('*', (req, res) => {
  res.status(404).send('Error: Page not found.');
});

// Express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
