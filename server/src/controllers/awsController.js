const path = require('path');
const fs = require('fs');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { s3 } = require('../libs/awsConfig.js');

const awsController = {};

awsController.postProfilePic = (req, res, next) => {
  //aws bucket config info
  fs.readFile(req.file.path, async (err, imgData) => {
    //   const imgUpload = req.files.file;
    const imgName = req.file.originalname;
    //   console.log('imgUpload: ', imgUpload);
    const params = {
      Bucket: 'goru-v1.1-image', // The name of the bucket. For example, 'sample-bucket-101'.
      Key: imgName, // The name of the object. For example, 'sample_upload.txt'.
      Body: imgData, // The content of the object. For example, 'Hello world!".
    };
    //handler function for AWS file upload to S3 bucket
    try {
      const data = await s3.send(new PutObjectCommand(params));
      console.log('recieved data from AWS: ', data);
      console.log(
        'Successfully created ' +
          params.Key +
          ' and uploaded it to ' +
          params.Bucket +
          '/' +
          params.Key
      );
      res.locals.url = `https://s3.amazonaws.com/goru-v1.1-image/${req.file.originalname}`;
      next();
    } catch (err) {
      console.log('Error', err);
    }
  });
};

// our middleware
const uploadsDir = path.join(__dirname, '../images');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // keep original filename
  },
});
const upload = multer({ storage: storage });

module.exports = { awsController, upload };
