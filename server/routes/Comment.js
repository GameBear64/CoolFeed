const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { CommentModel } = require('../models/Comment');
const { PostModel } = require('../models/Post');

router
  .route('/:postId')
  .post(async (req, res) => {
    console.log('new comment');
    console.log(req.body.body);
    let comment = await CommentModel.create({ body: req.body.body, author: req.userInSession, post: req.params.postId });
    await PostModel.updateOne({ _id: ObjectId(req.params.postId) }, { $push: { comments: comment._id } }, { timestamps: false });
    res.status(200).send({ message: 'Entry created' });
  })
  .patch((req, res) => {
    res.status(200).send({ message: 'Entry created' });
  })
  .delete((req, res) => {
    res.status(200).send({ message: 'Entry deleted' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/like/:commentId')
  .post(async (req, res) => {
    // console.log('new comment');
    // console.log(req.body.body);
    // let comment = await CommentModel.create({ body: req.body.body, author: req.userInSession, post: req.params.postId });
    // await PostModel.updateOne({ _id: ObjectId(req.params.postId) }, { $push: { comments: comment._id } }, { timestamps: false });
    // res.status(200).send({ message: 'Entry created' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Route is POST only' });
  });

module.exports = router;
