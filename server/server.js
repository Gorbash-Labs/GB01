const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const CLIENT_ID = '12511d91e841945b2edd';
const CLIENT_SECRETS = 'a0c26008058e961a4ceea77439f79c8ec02f916c';

const app = express();
const PORT = 3000;

// Routers
const techRouter = require(path.join(__dirname, '/src/routes/techRouter'));
const postRouter = require(path.join(__dirname, '/src/routes/postRouter'));
const userRouter = require(path.join(__dirname, '/src/routes/userRouter'));
const awsRouter = require(path.join(__dirname, '/src/routes/awsRouter'));

// Parse incoming JSON, static reqeusts, forms, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./dist'));
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());
// app.use(fileUpload());

// API router for server handling of db info
app.use('/api/tech', techRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/aws', awsRouter);

app.get('/getAccessToken', async (req, res) => {
  const queryString = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRETS}&code=${req.query.code}`;

  console.log(req.query.code);

  await fetch('https://github.com/login/oauth/access_token' + queryString, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      //console.log("response is", response);
      return response.json();
    })
    .then((data) => {
      console.log('data is', data);
      res.json(data);
    });
});

app.get('/getUserData', async (req, res) => {
  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('userdata is', data);
      res.json(data);
    });
});

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
