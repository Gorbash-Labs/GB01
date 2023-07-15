const express = requires('express');

const postController = require('../postController');
const techController = require('../techController');
const userController = require('../userController');

const router = express.Router();


// Look up a single tech
router.get('/:id', (req,res)=>{

  res.status(200).json(res.locals.techRequest);
})


// Search for tech with at '/tech/search?keywords=XXXX' on 'req.query.keywords'
router.get('/search', (req,res)=>{

  res.status(200).json(res.locals.techList);
})

// Look up all posts for a single tech
router.get('/posts/:id', (req,res)=>{

  res.status(200).json(res.locals.postList);
})

// Add new Tech to the database
router.post('/', (req,res)=>{

  res.sendStatus(200);
});


// Fetch all tech for home page display 
router.get('/', (req,res)=>{

  res.status(200).json(res.locals.techList);
});



module.exports = router;