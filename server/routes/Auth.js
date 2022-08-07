const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { UserModel } = require('../models/User');
const settings = require('./../../settings.json');

const createJWTSendCookie = (res, id) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id }, settings.secret, { expiresIn: expireAt });
};

const filterUserFelids = ({ _id, firstName, lastName, nickname, profilePicture }) => ({ _id, firstName, lastName, nickname, profilePicture });

router
  .route('/validate')
  .get(async (req, res) => {
    try {
      jwt.verify(req.headers?.jwt, settings.secret);
      return res.status(200).send({ tokenIsValid: true });
    } catch (err) {
      return res.status(401).send({ tokenIsValid: false });
    }
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is GET only' });
  });

router
  .route('/login')
  .post(async (req, res) => {
    let userAttempting = await UserModel.findOne({ email: req.body.email });
    if (!userAttempting) return res.status(403).send({ message: 'User does not exists' });

    bcrypt.compare(req.body?.password, userAttempting.password, function (err, result) {
      if (result) {
        return res.status(200).send({ jwt: createJWTSendCookie(res, userAttempting.id), user: filterUserFelids(userAttempting) });
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
        if (!req.body.profilePicture) {
          req.body.profilePicture = `https://ui-avatars.com/api/?size=255&bold=true&background=random&name=${encodeURIComponent(`${req.body.firstName} ${req.body?.lastName}`)}`;
        } else {
          // uknow
        }
        console.log('register', req.body);
        try {
          let user = await UserModel.create(req.body);
          return res.status(201).send({ jwt: createJWTSendCookie(res, user.id), user: filterUserFelids(user) });
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
