import { Request, Response } from 'express';
import Bcrypt = require('bcrypt');
import Jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registration = async (req: Request, res: Response) => {
  const { regLogin, regPwd, avatar } = req.body;

  const isExist = await User.findOne({ username: regLogin });

  if (isExist) {
    return res.status(400).json({ error: 'USER_EXIST' });
  }

  const bcryptSaltRounds = 5;
  const password = Bcrypt.hashSync(regPwd, bcryptSaltRounds);
  const newUser = new User({ username: regLogin, password, avatar, status: 'online' });

  await newUser.save();
  res.status(201).json({ payload: 'USER_CREATED' });
};

exports.auth = async (req: Request, res: Response) => {
  const { authLogin, authPwd } = req.body;

  const user = await User.findOne({ username: authLogin });

  if (!user) {
    return res.status(401).json({ error: 'AUTH_FAILED' });
  }

  const isPasswordMatch = await Bcrypt.compare(authPwd, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ error: 'AUTH_FAILED' });
  }

  const OnlineList = require('../controllers/online');

  if (OnlineList.multiple(user.username)) {
    return res.status(403).json({ error: 'MULTIPLE' });
  }

  const token = Jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({
    payload: {
      token,
      username: user.username,
      avatar: user.avatar,
      status: user.status
    }
  });
};

exports.verify = async (req: Request, res: Response) => {
  try {
    const { avatar, username, status } = await User.findOne({ _id: req.headers.userId });

    const OnlineList = require('../controllers/online');

    if (OnlineList.multiple(username)) {
      return res.status(403).json({ error: 'MULTIPLE' });
    }

    res.status(200).json({
      payload: {
        username,
        avatar,
        status
      }
    });
  } catch (e) {
    return res.status(401).json({ error: 'TOKEN_ERROR' });
  }
};
