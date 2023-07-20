const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// /api/user

// USERS
// Add new User to the database
// changed ednpoint to 'U', change on frontend as well
router.post(
  '/newUser',
  userController.makeUser,
  userController.newSession,
  (req, res) => {
    // if the user already exists send a bool back to frontend
    if (res.locals.existingUser) {
      console.log('user already exists pick a different username');
      res.status(400).json({ message: 'Username taken!' });
    }

    console.log('User created and session created successfully.');
    return res.sendStatus(200);
  },
);

// Login
router.post(
  '/login',
  userController.authenticate,
  userController.newSession,
  (req, res) => {
    // send back username, maybe contact?, cookie?
    res.status(200).json({ message: 'Login successful!' });
  },
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
    res
      .status(200)
      .json({ user: res.locals.userRequest, posts: res.locals.postList });
  },
);

module.exports = router;
