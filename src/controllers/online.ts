import ws = require('ws');
const wss = import('../server');
const actions = require('../utils/actions');
const User = require('../models/User');
const helpers = require('../utils/helpers');

let onlineList = [];

const sendOnlineList = async () => {
  onlineList.sort(helpers.sortCompare('username'));
  const payload = onlineList.map(({ id, ...rest }) => ({
    ...rest
  }));

  const { clients } = await wss as ws.Server;

  clients.forEach(client => client.send(
    JSON.stringify(actions.online(payload))
  ));
};

const setUserStatus = (status: string, userId: string) => {
  const userIndex = onlineList.findIndex(user => user.id === userId);
  onlineList[userIndex].status = status;
  sendOnlineList();
};

exports.online = async (ws, action) => {
  const { username, avatar, status } = await User.findOne({ _id: action.userId });
  onlineList.push({
    id: action.userId,
    avatar,
    username,
    status
  });

  sendOnlineList();

  ws.on('close', async () => {
    onlineList = onlineList.filter(user => user.id !== ws.uid);
    sendOnlineList();
  });
};

exports.setUserStatus = setUserStatus;
