import ws = require('ws');
const wss = import('../server');
const actions = require('../actions');
const User = require('../models/User');

let onlineList = [];

exports.add = async (ws, action) => {
  const { username, avatar } = await User.findOne({ _id: action.userId });

  onlineList.push({
    id: action.userId,
    avatar,
    username
  });

  const payload = onlineList.map(e => ({
    username: e.username,
    avatar: e.avatar
  }));
  const { clients } = await wss as ws.Server;

  clients.forEach(client => client.send(
    JSON.stringify(actions.online(payload))
  ));

  ws.on('close', () => {
    clients.forEach(client => client.send(
      JSON.stringify(actions.ping)
    ));
    onlineList = [];
  });
};
