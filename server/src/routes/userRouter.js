const express = requires('express');

const postController = require('../postController');
const techController = require('../techController');
const userController = require('../userController');

const router = express.Router();



// USERS 
// Add new User to the database
router.post('/newuser', (req,res)=>{

  res.status(200).send();
});

// Login 
router.post('/login', (req,res)=>{

  res.status(200).send();
})

// Look up a single user
router.get('/:id', (req,res)=>{

  res.status(200).json(res.locals.userRequest);
})


module.exports = router;