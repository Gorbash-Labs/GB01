const express = require('express');
const { awsController, upload } = require('../controllers/awsController');

const router = express.Router();

router.post(
  '/',
  upload.single('image'),
  awsController.postProfilePic,
  (req, res) => {
    res.status(200).json(res.locals.url);
  }
);

module.exports = router;
