const Message = require('../models/Message');

module.exports = async (ws, action) => {
  const actions = require('../utils/actions');
  const newMessage = new Message({ author: action.userId, ...action.payload });
  await newMessage.save();

  ws.send((JSON.stringify(actions.message(newMessage))));
};
