const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { UserModel } = require('../models/User');
const settings = require('./../../settings.json');

let createJWTSendCookie = (res, id) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id }, settings.secret, { expiresIn: expireAt });
};

router
  .route('/login')
  .post(async (req, res) => {
    console.log(req.body);
    let userAttempting = await UserModel.findOne({ email: req.body.email });
    if (!userAttempting) return res.status(403).send({ message: 'User exists' });

    bcrypt.compare(req.body?.password, userAttempting.password, function (err, result) {
      if (result) {
        return res.status(200).send({ jwt: createJWTSendCookie(res, userAttempting.id) });
      } else {
        return res.status(401).send({ message: 'Wrong credentials' });
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
      bcrypt.hash(req.body?.password, salt, async function (err, hash) {
        req.body.password = hash;
        try {
          let user = await UserModel.create(req.body);

          return res.status(201).send(createJWTSendCookie(res, user.id));
        } catch (err) {
          return res.status(406).send({ message: 'Error while creating user', error: err });
        }
      });
    });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is POST only' });
  });

module.exports = router;
