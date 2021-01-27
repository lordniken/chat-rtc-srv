import jwt = require('jsonwebtoken');

module.exports = async (ws, req, next) => {
  ws.on('message', (msg) => {
    if (typeof msg === 'string') {
      try {
        req.query = JSON.parse(msg);
      } catch (error) {
        return console.log(`Wrong data from client: ${msg}`.red);
      }
    }

    try {
      const tokenInfo = jwt.verify(req.query.token, process.env.JWT_SECRET);
      req.query = { ...req.query, userId: tokenInfo.id };

      return next();
    } catch (error) {
      ws.send(JSON.stringify({ type: '@user/USER_EXIT' }));
      return ws.close();
    }
  });
};
