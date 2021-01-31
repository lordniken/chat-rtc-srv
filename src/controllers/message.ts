import { EnchWebSocket } from '../types';
import ws = require('ws');
const Message = require('../models/Message');

module.exports = async (ws, action) => {
  const actions = require('../utils/actions');
  const wss = import('../server');

  const newMessage = new Message({ author: action.userId, ...action.payload });
  await newMessage.save();

  ws.send((JSON.stringify(actions.message(newMessage))));

  const { clients } = await wss as ws.Server;
  clients?.forEach((client: EnchWebSocket) => {
    if (client.uid === action.payload.to) {
      client.send(JSON.stringify(actions.message(newMessage)));
    }
  });
};
