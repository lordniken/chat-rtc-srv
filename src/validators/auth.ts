const { check } = require('express-validator');

exports.registration = [
  check('reg_login', 'Login can not be empty').not().isEmpty(),
  check('reg_pwd', 'Password too short').isLength({ min: 6 }),
  check('avatar', 'Avatar is required').not().isEmpty()
];

exports.auth = [
  check('reg_login', 'Login can not be empty').not().isEmpty(),
  check('reg_pwd', 'Password too short').isLength({ min: 6 })
];
