const express = requires('express');

const postController = require('../postController');
const techController = require('../techController');
const userController = require('../userController');

const router = express.Router();



// POSTS 
// Find all posts by a user /api/post/posts-by-user/USER_ID
router.get('/posts-by-user/:id', postController.findPostsByUser, (req,res)=>{

  res.status(200).json(res.locals.postList);
})


// Search for posts with at '/api/post/search?keywords=KEYWORDS' using 'req.query.keywords' - STRETCH GOAL
// router.get('/search', (req,res)=>{

//   res.status(200).json(res.locals.postList);
// })

// Look up a single post /api/post/POST_ID
router.get('/:id', postController.findPost, (req,res)=>{

  res.status(200).json(res.locals.postRequest);
})

// Update a single post
router.put('/:id', postController.findPost, userController.authenticate, userController.authorizeEdit, postController.editPost, (req,res)=>{

  res.status(200).send();
})

// Delete a single post
router.put('/:id', postController.findPost, userController.authenticate, userController.authorizeEdit, postController.deletePost, (req,res)=>{

  res.status(200).send();
})


// Add new Post to the database
router.post('/', userController.authenticate, postController.makePost, (req,res)=>{

  res.sendStatus(200);
});

// // Fetch all posts for an 'all posts' display that likely won't be used 
// router.get('/', (req,res)=>{

//   res.status(200).json(res.locals.postList);
// });



module.exports = router;