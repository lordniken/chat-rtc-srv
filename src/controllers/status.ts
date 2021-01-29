const actions = require('../utils/actions');
const online = require('./online');
const User = require('../models/User');

module.exports = async (ws, action) => {
  const user = await User.findOne({ _id: ws.uid });
  const newStatus = action.payload;
  user.status = newStatus;
  await user.save();

  ws.send(JSON.stringify(actions.status(newStatus)));

  online.setUserStatus(newStatus, ws.uid);
};
