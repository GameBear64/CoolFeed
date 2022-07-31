const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { UserModel } = require('../models/User');
const settings = require('./../../settings.json');

let createJWTSendCookie = (res, id) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  let token = jwt.sign({ id }, settings.secret, { expiresIn: expireAt });
  res.cookie('jwt', token, { httpOnly: true, maxAge: expireAt });
};

router
  .route('/login')
  .get(async (req, res) => {
    let userAttempting = await UserModel.findOne({ email: req.body.email });

    bcrypt.compare(req.body.password, userAttempting.password, function (err, result) {
      if (result) {
        createJWTSendCookie(res, userAttempting.id);
        return res.status(200).send({ message: 'Credentials send' });
      } else {
        return res.status(403).send({ message: 'Wrong credentials' });
      }
    });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is POST only' });
  });

router
  .route('/register')
  .post(async (req, res) => {
    let userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) return res.status(403).send({ message: 'User exists' });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        req.body.password = hash;
        let user = await UserModel.create(req.body);

        createJWTSendCookie(res, user.id);
        return res.status(200).send({ message: 'Entry created' });
      });
    });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is POST only' });
  });

module.exports = router;
