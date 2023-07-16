const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// USERS
// Add new User to the database
router.post(
  '/newuser',
  userController.makeUser,
  userController.newSession,
  (req, res) => {
    // if the user already exists send a bool back to frontend
    if (res.locals.existingUser) {
      console.log('user already exists pick a different username');
      res.status(200).send();
    }
    console.log('adding new user');
    res.status(200).send();
  }
);

// Login
router.post(
  '/login',
  userController.authenticate,
  userController.newSession,
  (req, res) => {
    res.status(200).send();
  }
);

//Sign-Out
router.get('/signout', userController.endSession, (req, res) => {
  res.status(200).redirect('/');
});

// Look up a single user
router.get(
  '/:id',
  userController.findUser,
  postController.findPostsByUser,
  (req, res) => {
    // res.locals.userRequest && res.locals.postList
    res.status(200).json();
  }
);

module.exports = router;
