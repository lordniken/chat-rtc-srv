import { MulterRequest } from '../types';
import { Response } from 'express';
const Message = require('../models/Message');

module.exports = async (req: MulterRequest, res: Response) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'FILE_MISSED' });
  if (file.size > process.env.MEDIA_MAX_SIZE) {
    return res.status(400).json({ error: 'FILE_SIZE', maxAllowed: process.env.MEDIA_MAX_SIZE });
  }
  const allowedMimeTypes = process.env.MEDIA_MIMETYPES.split(',');
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: 'FILE_MIMETYPE', allowedTypes: process.env.MEDIA_MIMETYPES });
  }

  const { to } = req.body;
  const newMessage = new Message({ author: req.headers.userId, type: 'media', message: file.key, to });
  await newMessage.save();
  res.send();
};
