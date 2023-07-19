const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

// require in dotenv.config
// use process.env.variable name to extract the hidden info from the .env file
// test with a console log of process.env and see if it prints an object with the variable names as the strings and the keys as the values

const app = express();
const PORT = 3000;

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
