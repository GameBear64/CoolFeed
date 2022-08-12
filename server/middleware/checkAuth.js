const jwt = require('jsonwebtoken');
const settings = require('./../../settings.json');

module.exports = (req, res, next) => {
  try {
    var decoded = jwt.verify(req.headers.jwt, settings.secret);
    req.userInSession = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
