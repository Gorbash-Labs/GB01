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

// Look up a single user
router.get(
  '/:id',
  userController.authenticate,
  userController.findUser,
  (req, res) => {
    res.status(200).json(res.locals.userRequest);
  }
);

module.exports = router;
