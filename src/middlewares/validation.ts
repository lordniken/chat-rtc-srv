import Express = require('express');
const { validationResult } = require('express-validator');

function validate (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({
      errors: validate.errors.map(error => ({
        [error.param]: error.msg
      }))
    });
  }

  next();
}

module.exports = validate;
