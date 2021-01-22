import Express = require('express');

exports.registration = async (req: Express.Request, res: Express.Response) => {
  res.status(200).json('ok');
};

exports.auth = (req: Express.Request, res: Express.Response) => {
  res.status(200).send('auth controller');
};
