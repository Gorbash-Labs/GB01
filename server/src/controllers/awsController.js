const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../libs/awsConfig.js');

const awsController = {};

awsController.postProfilePic = async (req, res, next) => {
  console.log('entering postProfilePic');
  //aws bucket config info
  const img = req.file;
  const imgName = req.file.originalname;
  console.log('img: ', img);
  const params = {
    Bucket: 'goru-v1.1-image', // The name of the bucket. For example, 'sample-bucket-101'.
    Key: imgName, // The name of the object. For example, 'sample_upload.txt'.
    Body: img.path, // The content of the object. For example, 'Hello world!".
  };
  //handler function for AWS file upload to S3 bucket
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log('recieved data from AWS: ', data);
    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key
    );
    next();
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = awsController;
