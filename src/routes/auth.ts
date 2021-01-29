import express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const tokenMiddleware = require('../middlewares/token');

const validators = require('../validators/auth');
const validatorMiddleware = require('../middlewares/validation');

router.put('/registration', validators.registration, validatorMiddleware, controller.registration);
router.post('/', validators.auth, validatorMiddleware, controller.auth);
router.get('/', tokenMiddleware, controller.verify);

module.exports = router;
