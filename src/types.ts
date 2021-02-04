import { Request } from 'express';
import WebSocket = require('ws');

export interface EnchWebSocket extends WebSocket {
  uid: string;
}

export interface MulterRequest extends Request {
  file: any;
}
