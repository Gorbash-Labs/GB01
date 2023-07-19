const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// Search for tech with at '/tech/search?keywords=XXXX' on 'req.query.keywords'
router.get(
  '/search',
  techController.searchTech, //
  (req, res) => {
    res.status(200).json(res.locals.techList);
  }
);

// Look up all posts for a single tech
router.get('/posts/:id', postController.findPostsByTech, (req, res) => {
  res.status(200).json(res.locals.postList);
});

// Add new Tech to the database
router.post(
  '/',
  // userController.authenticate, // ignored to test makeTech
  techController.makeTech, // DONE
  (req, res) => {
    res.sendStatus(200);
  }
);

// Look up a single tech
router.get(
  '/:id',
  techController.findTech,
  postController.findPostsByTech,
  postController.findLanguagesByTech, // just return everything for now
  (req, res) => {
    const responseObj = {
      tech: res.locals.techRequest,
      posts: res.locals.postList,
      languages: res.locals.languages,
    };
    res.status(200).json(responseObj);
  }
);

// Fetch all tech for home page display
router.get(
  '/',
  techController.getAllTech, // DONE
  (req, res) => {
    //console.log('Ready to send all tech:', res.locals.techList);
    res.status(200).json(res.locals.techList);
  }
);

module.exports = router;
