const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { UserModel } = require('../models/User');

const settings = require('./../../settings.json');

const createJWTSendCookie = id => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id }, settings.secret, { expiresIn: expireAt });
};

const filterUserFelids = ({ _id, firstName, lastName, nickname, profilePicture }) => ({ _id, firstName, lastName, nickname, profilePicture });

router
  .route('/login')
  .post(async (req, res) => {
    let userAttempting = await UserModel.findOne({ email: req.body.email });
    if (!userAttempting) return res.status(403).send({ message: 'User does not exists' });

    bcrypt.compare(req.body?.password, userAttempting.password, function (err, result) {
      if (result) {
        return res.status(200).send({ jwt: createJWTSendCookie(userAttempting.id), user: filterUserFelids(userAttempting) });
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

    if (req.body?.firstName?.length > 15 || req.body?.firstName?.length > 15) return res.status(406).send({ message: 'Felid too long' });

    if (req.body?.password?.length < 8 || req.body?.confirmPassword?.length < 8) return res.status(406).send({ message: 'Felid too short' });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body?.password, salt, async function (err, hash) {
        req.body.password = hash;
        if (!req.body.profilePicture) {
          req.body.profilePicture = `https://ui-avatars.com/api/?size=255&bold=true&background=random&name=${encodeURIComponent(`${req.body.firstName} ${req.body?.lastName}`)}`;
        } else {
          // uknow
        }
        try {
          let user = await UserModel.create(req.body);
          return res.status(201).send({ jwt: createJWTSendCookie(user.id), user: filterUserFelids(user) });
        } catch (err) {
          return res.status(406).send({ message: 'Error while creating user', error: err });
        }
      });
    });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is POST only' });
  });

router
  .route('/password')
  .patch(async (req, res) => {
    let userProfile = await UserModel.findOne({ email: req.body.email });

    //confirm old password first
    bcrypt.compare(req.body?.oldPassword, userProfile.password).then(rez => {
      if (!rez) return res.status(401).send({ message: 'Wrong credentials' });

      if (req.body?.password?.length < 8 || req.body?.confirmPassword?.length < 8) return res.status(406).send({ message: 'Felid too short' });

      if (req.body?.password !== req.body?.confirmPassword) return res.status(403).send({ message: "Passwords don't match" });

      //change pass
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body?.password, salt, async function (err, hash) {
          try {
            await userProfile.update({ password: hash });

            return res.status(201).send({ message: 'User Updated' });
          } catch (err) {
            return res.status(406).send({ message: 'Error while updating user', error: err });
          }
        });
      });
    });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is GET only' });
  });

module.exports = router;
