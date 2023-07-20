const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'images/' });

const awsController = require('../controllers/awsController');

const router = express.Router();

router.post(
  '/',
  (req, res, next) => {
    console.log(1);
    next();
  },
  upload.single('image'),
  awsController.postProfilePic,
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;

// multer img data:
// img {
//    fieldname: 'img',
//    originalname: 'awesomo.png',
//    encoding: '7bit',
//    mimetype: 'image/png',
//    destination: 'uploads/',
//    filename: '7f120b7795447c77e680d6e3fdd86d91',
//    path: 'uploads/7f120b7795447c77e680d6e3fdd86d91',
//    size: 19071
// }
