import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const tokenArray = req.headers.authorization.split(' ');
    const token = tokenArray[1];

    if (!token) {
      return res.status(401).json({ error: 'TOKEN_ERROR' });
    }

    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenInfo) {
      return res.status(401).json({ error: 'TOKEN_ERROR' });
    }

    req.headers.userId = tokenInfo.id;

    next();
  } catch (e) {
    return res.status(401).json({ error: 'TOKEN_ERROR' });
  }
};
