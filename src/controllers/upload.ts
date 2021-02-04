import { MulterRequest } from '../types';
import { Response } from 'express';

module.exports = async (req: MulterRequest, res: Response) => {
  const file = (req as MulterRequest).file;

  res.send(file.location);
};
