const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { UserModel } = require('../models/User');
const { PostModel } = require('../models/Post');
const { CommentModel } = require('../models/Comment');

router
  .route('/')
  .patch(async (req, res) => {
    if (req.body) await UserModel.updateOne({ _id: ObjectId(req.userInSession) }, { ...req.body });
  })
  .delete(async (req, res) => {
    await UserModel.deleteOne({ _id: ObjectId(req.userInSession) });
    await PostModel.deleteMany({ author: req.userInSession });
    await CommentModel.deleteMany({ author: req.userInSession });

    res.status(200).send({ message: 'User Removed' });
    // res.status(200).send({ message: 'Use another method' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friends')
  .get(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.userInSession) })
      .populate('pendingFriends', '_id firstName lastName nickname profilePicture pendingFriends friends')
      .populate('friends', '_id firstName lastName nickname profilePicture pendingFriends friends');
    res.status(200).send(user);
    // res.status(200).send({ message: 'Use another method' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friend/:id')
  .post(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.userInSession) });

    if (user.pendingFriends.includes(req.params.id)) {
      //user
      await user.update({ $push: { friends: req.params.id }, $pull: { pendingFriends: req.params.id } }, { timestamps: false });
      //user's friend
      await UserModel.updateOne({ _id: ObjectId(req.params.id) }, { $push: { friends: req.userInSession } }, { timestamps: false });
    } else {
      await UserModel.updateOne({ _id: ObjectId(req.params.id) }, { $push: { pendingFriends: req.userInSession } }, { timestamps: false });
    }

    res.status(200).send({ message: 'Friend request send' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/unfriend/:id')
  .post(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.params.id) });

    if (user.pendingFriends.includes(req.userInSession)) {
      await user.update({ $pull: { pendingFriends: req.userInSession } }, { timestamps: false });
    } else {
      //user's friend
      await user.update({ $pull: { friends: req.userInSession } }, { timestamps: false });
      //user
      await UserModel.updateOne({ _id: ObjectId(req.userInSession) }, { $pull: { friends: req.params.id } }, { timestamps: false });
    }

    res.status(200).send({ message: 'Friend request send' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/friends/:id')
  .get(async (req, res) => {
    let user = await UserModel.findOne({ _id: ObjectId(req.params.id) }) //select what to show
      .populate('friends', '_id firstName lastName nickname profilePicture');

    res.status(200).send(user);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    let userInfo = await UserModel.findOne({ _id: ObjectId(req.params.id) }).populate('friends', '_id firstName lastName nickname profilePicture pendingFriends friends');
    res.status(200).send(userInfo);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
