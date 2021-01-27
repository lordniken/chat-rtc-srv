import express = require('express');
const router = express.Router();
const wsTokenMiddleware = require('../middlewares/wsToken');

router.ws('/', wsTokenMiddleware, (ws, req) => {
  console.log(req.query.type);
});

module.exports = router;
