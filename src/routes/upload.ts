
import express = require('express');
const router = express.Router();

const tokenMiddleware = require('../middlewares/token');
const uploadMiddleware = require('../middlewares/upload');
const controller = require('../controllers/upload');
const multer = require('../utils/multer');

router.post('/image', tokenMiddleware, multer.single('media'), uploadMiddleware, controller.image);
router.post('/voice', tokenMiddleware, multer.single('media'), controller.voice);
router.get('/', controller.get);

module.exports = router;
