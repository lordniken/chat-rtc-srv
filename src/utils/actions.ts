exports.online = payload => ({ type: '@chat/SET_ONLINE_LIST', payload });
exports.status = payload => ({ type: '@user/STATUS_CHANGED', payload });
exports.message = payload => ({ type: '@chat/MESSAGE_SENDED', payload });
exports.broadcast = { type: '@chat/BROADCAST' };
exports.exit = { type: '@user/USER_EXIT' };
