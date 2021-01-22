const { check } = require('express-validator');

exports.registration = [
  check('regLogin', 'Login can not be empty').not().isEmpty(),
  check('regPwd', 'Password too short').isLength({ min: 6 }),
  check('avatar', 'Avatar is required').not().isEmpty()
];

exports.auth = [
  check('authLogin', 'Login can not be empty').not().isEmpty(),
  check('authPwd', 'Password too short').isLength({ min: 6 })
];
