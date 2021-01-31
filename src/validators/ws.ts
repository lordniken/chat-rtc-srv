import { EnchWebSocket } from '../types';
import WebSocket = require('ws');
import jwt = require('jsonwebtoken');
const actions = require('../utils/actions');

module.exports = (msg: WebSocket.Data, ws: EnchWebSocket) => {
  let json;
  if (typeof msg === 'string') {
    try {
      json = JSON.parse(msg);
    } catch (error) {
      console.log(`Wrong data from client: ${msg}`.red);
      return null;
    }
  }
  try {
    const tokenInfo = jwt.verify(json.token, process.env.JWT_SECRET);
    json = { ...json, userId: tokenInfo.id };

    ws.uid = tokenInfo.id;

    return json;
  } catch (error) {
    ws.send(JSON.stringify(actions.exit));
    ws.close();
    return null;
  }
};
