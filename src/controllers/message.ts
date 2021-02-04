import { EnchWebSocket } from '../types';
import ws = require('ws');
const Message = require('../models/Message');
const actions = require('../utils/actions');
const helpers = require('../utils/helpers');

exports.send = async (ws, action) => {
  const wss = import('../server');

  const newMessage = new Message({ author: action.userId, type: 'message', ...action.payload });
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
  const FETCH_MESSAGES_LIMIT = 20;

  const query = {
    $or: [
      { author: action.payload.id, to: ws.uid },
      { author: ws.uid, to: action.payload.id }
    ]
  };

  let limit = FETCH_MESSAGES_LIMIT;

  if (action.payload.count) {
    limit = ((action.payload.count / FETCH_MESSAGES_LIMIT) + 1) * FETCH_MESSAGES_LIMIT;
  }

  const totalMessages = await Message.find(query).countDocuments();
  const messages = await Message.find(query).sort({ date: -1 }).limit(limit);
  const sortedMessages = messages.sort(helpers.sortCompare('date'));

  const payload = JSON.stringify({
    list: sortedMessages,
    totalMessages
  });

  if (messages) {
    ws.send(JSON.stringify(actions.fetchMessages(payload)));
  }
};
