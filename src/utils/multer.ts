const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const spacesEndpoint = new aws.Endpoint(process.env.AWS_ENDPOINT);
aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const MAX_MEDIA_SIZE = 3000000;
const MIME_TYPES = ['image/png', 'image/jpeg', 'application/octet-stream'];

module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      const userId = req.headers.userId;
      const ext = path.extname(file.originalname);
      cb(null, `${userId}_${Date.now()}${ext}`);
    }
  }),
  fileFilter: function (_, file, cb) {
    if (MIME_TYPES.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
  limits: { fileSize: MAX_MEDIA_SIZE }
});
