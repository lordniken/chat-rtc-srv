import { setTimeout } from 'timers';
import ws = require('ws');
const wss = import('../server');
const actions = require('../utils/actions');
const User = require('../models/User');
const helpers = require('../utils/helpers');

let onlineList = [];

const ONLINE_FILL_TIMEOUT = 100;

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

const onDisconnect = async () => {
  onlineList = [];

  const { clients } = await wss as ws.Server;

  clients.forEach(client => client.send(
    JSON.stringify(actions.broadcast)
  ));
};

exports.online = async (action) => {
  const isUserAlreadyLogged = onlineList.find(user => user.id === action.userId);
  if (!isUserAlreadyLogged) {
    const { username, avatar, status } = await User.findOne({ _id: action.userId });
    onlineList.push({
      id: action.userId,
      avatar,
      username,
      status
    });
  }
  setTimeout(() => sendOnlineList(), ONLINE_FILL_TIMEOUT);
};

exports.setUserStatus = setUserStatus;
exports.onDisconnect = onDisconnect;
