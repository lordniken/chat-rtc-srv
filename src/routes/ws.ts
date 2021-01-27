import express = require('express');
const router = express.Router();
const wsTokenMiddleware = require('../middlewares/wsToken');
const wsController = require('../controllers/ws');

router.ws('/', wsTokenMiddleware, async (ws, req) => {
  switch (req.query.type) {
    case 'NEW': wsController.add(ws, req.query);
  }
});

module.exports = router;
