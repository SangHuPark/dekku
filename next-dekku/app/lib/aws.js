// lib/aws.js
const AWS = require('aws-sdk');

// AWS 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key
  region: process.env.AWS_REGION // AWS Region
});

module.exports = s3;
