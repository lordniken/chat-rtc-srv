const onlineController = require('../controllers/online');
const statusController = require('../controllers/status');
const messageController = require('../controllers/message');
const validateWsMessage = require('../validators/ws');

module.exports = async (ws) => {
  ws.on('message', (msg) => {
    const req = validateWsMessage(msg, ws);

    if (req) {
      switch (req.type) {
        case '@WS/USER_LOGIN': onlineController.online(req); break;
        case '@user/CHANGE_STATUS': statusController(ws, req); break;
        case '@chat/SEND_MESSAGE': messageController(ws, req); break;
      }
    }
  });

  ws.on('close', async () => {
    onlineController.onDisconnect();
  });
};
