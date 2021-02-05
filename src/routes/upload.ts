
import express = require('express');
const router = express.Router();

const tokenMiddleware = require('../middlewares/token');
const uploadMiddleware = require('../middlewares/upload');
const controller = require('../controllers/upload');
const multer = require('../utils/multer');

router.post('/', tokenMiddleware, multer.single('media'), uploadMiddleware, controller.send);
router.get('/', controller.get);

module.exports = router;
