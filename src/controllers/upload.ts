import { MulterRequest } from '../types';
import { Request, Response } from 'express';
const Message = require('../models/Message');
const MessageController = require('./message');

exports.image = async (req: MulterRequest, res: Response) => {
  const file = req.file;
  const { to } = req.body;

  const newMessage = new Message({
    author: req.headers.userId,
    type: 'image',
    message: file.key,
    to
  });
  await newMessage.save();

  res.send();

  MessageController.sendMedia(newMessage);
};

exports.voice = async (req: MulterRequest, res: Response) => {
  const file = req.file;
  const { to } = req.body;

  const newMessage = new Message({
    author: req.headers.userId,
    type: 'voice',
    message: file.key,
    to
  });
  await newMessage.save();

  res.send();

  MessageController.sendMedia(newMessage);
};

exports.get = async (req: Request, res: Response) => {
  if (!req.query.id) return res.status(400).json({ error: 'MISSED_PARAMS' });

  const request = require('request').defaults({ encoding: null });
  request.get(`${process.env.AWS_HOST}/${req.query.id}`, function (_, { statusCode }, body) {
    if (statusCode === 200) {
      return res.send(body);
    }
    return res.status(statusCode).send();
  });
};
