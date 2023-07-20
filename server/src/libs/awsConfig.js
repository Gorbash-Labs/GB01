const { S3Client } = require('@aws-sdk/client-s3');
const secrets = require('./secrets.js');
// Set the AWS Region.
const config = {
  region: 'us-east-1',
  accessKeyId: secrets.accessKeyId,
  secretAccessKey: secrets.secretAccessKey,
};
// Create an Amazon S3 service client object.
const s3 = new S3Client(config);

module.exports = { s3 };
