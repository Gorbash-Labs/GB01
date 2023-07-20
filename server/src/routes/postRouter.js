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
  res.status(200).json(res.locals.postRequest);
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
  }
);

// Delete a single post
//id is the post id
router.delete(
  '/:id',
  postController.deletePost,
  (req, res) => {
    res.status(200).json(res.locals.deleted);
  }
);

// Add new Post to the database
router.post(
  '/',
  // userController.authenticate, // skipped for testing
  postController.makePost,
  (req, res) => {
    res.sendStatus(200);
  }
);

// // Fetch all posts for an 'all posts' display Goes to GENERAL COMMETNS Page
router.get('/', postController.retrievePosts, (req,res)=>{
  return res.status(200).json(res.locals.comments);
});

module.exports = router;
