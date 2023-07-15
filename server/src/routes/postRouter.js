const express = requires('express');

const postController = require('../postController');
const techController = require('../techController');
const userController = require('../userController');

const router = express.Router();



// POSTS 
// Find all posts by a user
router.get('/posts-by-user/:id', (req,res)=>{

  res.status(200).json(res.locals.postList);
})


// Search for posts with at '/post/search?keywords=XXXX' using 'req.query.keywords' - STRETCH GOAL
router.get('/search', (req,res)=>{

  res.status(200).json(res.locals.postList);
})

// Look up a single post
router.get('/:id', (req,res)=>{

  res.status(200).json(res.locals.postRequest);
})

// Update a single post
router.put('/:id', (req,res)=>{

  res.status(200).send();
})

// Delete a single post
router.put('/:id', (req,res)=>{

  res.status(200).send();
})


// Add new Post to the database
router.post('/', (req,res)=>{

  res.sendStatus(200);
});

// Fetch all posts for an 'all posts' display that likely won't be used 
router.get('/', (req,res)=>{

  res.status(200).json(res.locals.postList);
});



module.exports = router;