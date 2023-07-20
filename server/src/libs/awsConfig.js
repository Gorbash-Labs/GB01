const AWS = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3');
// Set the AWS Region.
const config = {
  region: 'us-east-1',
  accessKeyId: 'AKIAVKLTZQOTX2AGXIFE',
  secretAccessKey: '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',
};
// Create an Amazon S3 service client object.
const s3Client = new S3Client(config);

module.exports = { s3Client };
