const { validationResult } = require('express-validator');

function validate (req, res, next) {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json(validate.errors.map(error => error.msg));
  }

  next();
}

module.exports = validate;
