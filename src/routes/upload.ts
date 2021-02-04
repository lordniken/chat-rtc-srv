
import express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const tokenMiddleware = require('../middlewares/token');
const controller = require('../controllers/upload');

const spacesEndpoint = new aws.Endpoint(process.env.AWS_ENDPOINT);
aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      const userId = req.headers.userId;
      const ext = path.extname(file.originalname);
      cb(null, `${userId}_${Date.now()}${ext}`);
    }
  })
});

router.post('/', tokenMiddleware, upload.single('media'), controller);

module.exports = router;
