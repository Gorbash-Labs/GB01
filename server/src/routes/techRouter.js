const express = requires('express');

const postController = require('../postController');
const techController = require('../techController');
const userController = require('../userController');

const router = express.Router();


// Look up a single tech
router.get('/:id', techController.findTech, (req,res)=>{

  res.status(200).json(res.locals.techRequest);
})


// Search for tech with at '/tech/search?keywords=XXXX' on 'req.query.keywords'
router.get('/search', techController.searchTech, (req,res)=>{

  res.status(200).json(res.locals.techList);
})

// Look up all posts for a single tech
router.get('/posts/:id', postController.findPostsByTech, (req,res)=>{

  res.status(200).json(res.locals.postList);
})

// Add new Tech to the database
router.post('/', userController.authenticate, techController.makeTech, (req,res)=>{

  res.sendStatus(200);
});


// Fetch all tech for home page display 
router.get('/', techController.getAllTech, (req,res)=>{

  res.status(200).json(res.locals.techList);
});



module.exports = router;