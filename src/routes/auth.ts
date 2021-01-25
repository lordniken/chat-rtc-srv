import express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const tokenMiddleware = require('../middlewares/token');

const authValidators = require('../validators/auth');
const validatorMiddleware = require('../middlewares/validation');

router.put('/registration', authValidators.registration, validatorMiddleware, controller.registration);
router.post('/', authValidators.auth, validatorMiddleware, controller.auth);
router.get('/', tokenMiddleware, controller.verify);

module.exports = router;
