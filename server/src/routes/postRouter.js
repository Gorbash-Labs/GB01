const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// POSTS
// Find all posts by a user /api/post/posts-by-user/USER_ID
// @STEVER how will you know the user id here from front end? i assume you would only know their username. when that user name is passed down we can convert it to Id
// @Tony - It's stored as req.cookies('SSID')
// router.get('/posts-by-user/:id', postController.findPostsByUser, (req, res) => {
//   res.status(200).json(res.locals.postList);
// });

// Search for posts with at '/api/post/search?keywords=KEYWORDS' using 'req.query.keywords' - STRETCH GOAL
// router.get('/search', (req,res)=>{

//   res.status(200).json(res.locals.postList);
// })

// Look up a single post /api/post/POST_ID
router.get('/:id', postController.findPost, (req, res) => {
  res.status(200).json();
});

// Update a single post
router.put(
  '/:id',
  postController.findPost,
  userController.authenticate,
  userController.authorizeEdit,
  postController.editPost,
  (req, res) => {
    res.status(200).send();
  },
);

// Delete a single post
router.put(
  '/:id',
  postController.findPost,
  userController.authenticate,
  userController.authorizeEdit,
  postController.deletePost,
  (req, res) => {
    res.status(200).send();
  },
);

// Add new Post to the database
router.post(
  '/:id',
  // userController.authenticate, // skipped for testing
  postController.makePost,
  postController.findPostsByTech,
  (req, res) => {
    console.log('Made it through findPostsByTech');
    res.status(200).json(res.locals.postList);
  },
);

// // Fetch all posts for an 'all posts' display that likely won't be used
// router.get('/', (req,res)=>{

//   res.status(200).json(res.locals.postList);
// });

module.exports = router;
