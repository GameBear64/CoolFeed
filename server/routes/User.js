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
    //logic: if one has a friend in pending and sends another person a fr request
    //remove friend from pending and write to both's friends list
    await UserModel.updateOne({ _id: ObjectId(req.params.id) }, { $push: { pendingFriends: req.userInSession } }, { timestamps: false });

    res.status(200).send({ message: 'Friend request send' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friends')
  .get(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.userInSession) })
      .populate('pendingFriends')
      .populate('friends');

    res.status(200).send(user);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friends/:id')
  .get(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.params.id) }) //select what to show
      .populate('friends');

    res.status(200).send(user);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
