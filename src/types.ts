import WebSocket = require('ws');

export interface EnchWebSocket extends WebSocket {
  uid: string;
}
