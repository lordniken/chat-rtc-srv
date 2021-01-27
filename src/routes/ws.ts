import express = require('express');
const router = express.Router();
const wsTokenMiddleware = require('../middlewares/wsToken');
const onlineController = require('../controllers/online');

router.ws('/', wsTokenMiddleware, async (ws, req) => {
  switch (req.query.type) {
    case 'NEW': onlineController(ws, req.query);
  }
});

module.exports = router;
