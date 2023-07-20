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
      res.status(201).send();
    }
    res.status(200).send();
  }
);

// Login
router.post(
  '/login',
  userController.authenticate,
  userController.newSession,
  (req, res) => {
    const id = res.locals.userId;
    res.status(200).json(id);
  }
);

//Sign-Out
router.get('/signout', userController.endSession, (req, res) => {
  res.status(200).redirect('/');
});

//Is already signed in
router.get('/checkSession', (req, res) => {
  if (req.cookies.SSID) {
    res.status(200).json({ authenticate: true, id: req.cookies.SSID });
  } else {
    res.status(200).json({ authenticate: false });
  }
});

// Look up a single user by name
router.get(
  '/id/:id',
  userController.findUserById,
  postController.findPostsByUser,
  (req, res) => {
    // res.locals.userRequest && res.locals.postList
    res
      .status(200)
      .json({ user: res.locals.userRequest, posts: res.locals.postList });
  }
);

// Look up a single user by name
router.get(
  '/:userName',
  userController.findUser,
  postController.findPostsByUser,
  (req, res) => {
    // res.locals.userRequest && res.locals.postList
    res
      .status(200)
      .json({ user: res.locals.userRequest, posts: res.locals.postList });
  }
);

//find all users
router.get('/', userController.findAllUsers, (req, res) => {
  // res.locals.userRequest && res.locals.postList
  res.status(200).json({ user: res.locals.userRequest });
});

router.patch('/:id', userController.updateUser, (req, res) => {
  res.status(200).json(res.locals.newUserInfo);
});

module.exports = router;
