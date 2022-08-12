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
    let targetComment = await CommentModel.findOne({ _id: ObjectId(req.params.postOrCommentId) });

    if (req.userInSession !== targetComment.author.toString()) return res.status(401).send({ message: 'Not Authorized' });

    try {
      await targetComment.update({ body: req.body.body });

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
    let post = await PostModel.findOne({ _id: ObjectId(req.params.postId) });

    if (req.userInSession !== comment.author.toString() && req.userInSession !== post.author.toString()) return res.status(401).send({ message: 'Not Authorized' });

    await post.update({ $pull: { comments: comment._id } }, { timestamps: false });

    await comment.delete();
    res.status(200).send({ message: 'Entry deleted' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

// router
//   .route('/like/:commentId')
//   .post(async (req, res) => {
//
//   })
//   .all((req, res) => {
//     res.status(405).send({ message: 'Route is POST only' });
//   });

module.exports = router;
