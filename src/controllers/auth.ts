import Express = require('express');
import Bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 5;

exports.registration = async (req: Express.Request, res: Express.Response) => {
  const { regLogin, regPwd, avatar } = req.body;

  const isExist = await User.findOne({ login: regLogin });

  if (isExist) {
    return res.status(400).json({ errors: 'LOGIN_EXIST' });
  }

  const password = Bcrypt.hashSync(regPwd, SALT_ROUNDS);
  const newUser = new User({ login: regLogin, password, avatar });

  await newUser.save();
  res.status(201).json({ message: 'USER_CREATED' });
};

exports.auth = (req: Express.Request, res: Express.Response) => {
  res.status(200).send('auth controller');
};
