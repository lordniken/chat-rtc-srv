import Express = require('express');
import Bcrypt = require('bcrypt');
import Jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registration = async (req: Express.Request, res: Express.Response) => {
  const { regLogin, regPwd, avatar } = req.body;

  const isExist = await User.findOne({ login: regLogin });

  if (isExist) {
    return res.status(400).json({ error: 'USER_EXIST' });
  }

  const bcryptSaltRounds = 5;
  const password = Bcrypt.hashSync(regPwd, bcryptSaltRounds);
  const newUser = new User({ login: regLogin, password, avatar });

  await newUser.save();
  res.status(201).json({ payload: 'USER_CREATED' });
};

exports.auth = async (req: Express.Request, res: Express.Response) => {
  const { authLogin, authPwd } = req.body;

  const user = await User.findOne({ login: authLogin });

  if (!user) {
    return res.status(401).json({ error: 'AUTH_FAILED' });
  }

  const isPasswordMatch = await Bcrypt.compare(authPwd, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ error: 'AUTH_FAILED' });
  }

  const token = Jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({
    payload: {
      token,
      username: user.login,
      avatar: user.avatar
    }
  });
};
