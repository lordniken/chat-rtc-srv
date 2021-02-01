import { EnchWebSocket } from '../types';
import ws = require('ws');
const Message = require('../models/Message');
const actions = require('../utils/actions');

exports.send = async (ws, action) => {
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

exports.fetch = async (ws, action) => {
  const messages = await Message.find(
    {
      $or: [
        { author: action.payload },
        { to: action.payload }
      ]
    }
  );

  if (messages) {
    ws.send(JSON.stringify(actions.fetchMessages(messages)));
  }
};
