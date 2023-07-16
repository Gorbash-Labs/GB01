const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./dist'));

// const postController = require('../postController');
// const techController = require('../techController');
const userController = require('./src/controllers/userController');

app.get(
  '/test',
  // middlewares
  userController.makeUser,
  (req, res) => {
    console.log('End of test');
    return res.sendStatus(200);
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
