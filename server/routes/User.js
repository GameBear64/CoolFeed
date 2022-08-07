const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { UserModel } = require('../models/User');

router
  .route('/:id')
  .get(async (req, res) => {
    let userInfo = await UserModel.findOne({ _id: ObjectId(req.params.id) });
    res.status(200).send(userInfo);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friend/:id')
  .post(async (req, res) => {
    console.log('new frien', req.params.id);
    await UserModel.updateOne({ _id: ObjectId(req.params.id) }, { $push: { pendingFriends: req.userInSession } }, { timestamps: false });

    res.status(200).send({ message: 'Friend request send' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
