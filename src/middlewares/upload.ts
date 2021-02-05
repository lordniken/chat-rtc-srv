import { NextFunction, Response } from 'express';
import { MulterRequest } from '../types';

module.exports = (req: MulterRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const file = req.file;
  if (!file) return res.status(400).json({ error: 'UPLOAD_ERROR' });

  next();
};
