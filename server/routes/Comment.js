const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { CommentModel } = require('../models/Comment');
const { PostModel } = require('../models/Post');

router
  .route('/:postOrCommentId')
  .post(async (req, res) => {
    let comment = await CommentModel.create({ body: req.body.body, author: req.userInSession, post: req.params.postOrCommentId });

    await PostModel.updateOne({ _id: ObjectId(req.params.postOrCommentId) }, { $push: { comments: comment._id } }, { timestamps: false });
    res.status(200).send({ message: 'Entry created' });
  })
  .patch(async (req, res) => {
    console.log('hit', req.params.postOrCommentId, req.body.body);
    try {
      await CommentModel.updateOne({ _id: ObjectId(req.params.postOrCommentId) }, { body: req.body.body });

      return res.status(200).send({ message: 'Entry patched' });
    } catch (err) {
      return res.status(406).send({ message: 'Error while editing comment', error: err });
    }
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/:postId/:commentId')
  .delete(async (req, res) => {
    let comment = await CommentModel.findOne({ _id: ObjectId(req.params.commentId) });

    await PostModel.updateOne({ _id: ObjectId(req.params.postId) }, { $pull: { comments: comment._id } }, { timestamps: false });

    await comment.delete();
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
