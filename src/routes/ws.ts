const onlineController = require('../controllers/online');
const statusController = require('../controllers/status');
const validateWsMessage = require('../validators/ws');

module.exports = async (ws) => {
  ws.on('message', (msg) => {
    const req = validateWsMessage(msg, ws);

    if (req) {
      switch (req.type) {
        case '@WS/USER_LOGIN': onlineController.online(ws, req); break;
        case '@WS/CHANGE_STATUS': statusController(ws, req); break;
      }
    }
  });
};
