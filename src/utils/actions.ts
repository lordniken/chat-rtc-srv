exports.online = payload => ({ type: '@chat/SET_ONLINE_LIST', payload });
exports.status = payload => ({ type: '@user/STATUS_CHANGED', payload });
exports.message = payload => ({ type: '@chat/NEW_MESSAGE', payload });
exports.fetchMessages = payload => ({ type: '@chat/SET_MESSAGES', payload });
exports.broadcast = { type: '@chat/BROADCAST' };
exports.exit = { type: '@user/USER_EXIT' };
