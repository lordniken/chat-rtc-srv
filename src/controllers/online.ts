import { setTimeout } from 'timers';
import ws = require('ws');
const wss = import('../server');
const actions = require('../utils/actions');
const User = require('../models/User');
const helpers = require('../utils/helpers');

let onlineList = [];

const ONLINE_FILL_TIMEOUT = 300;

const sendOnlineList = async () => {
  onlineList.sort(helpers.sortCompare('username'));
  const { clients } = await wss as ws.Server;

  clients?.forEach(client => client.send(
    JSON.stringify(actions.online(onlineList))
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

  clients?.forEach(client => client.send(
    JSON.stringify(actions.broadcast)
  ));
};

exports.online = async (action) => {
  if (!checkMultiple(action.userId)) {
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

const checkMultiple = (username: string) => {
  return !!onlineList.find(user => user.username === username);
};

exports.multiple = checkMultiple;
exports.setUserStatus = setUserStatus;
exports.onDisconnect = onDisconnect;
