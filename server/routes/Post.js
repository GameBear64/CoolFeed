const router = require('express').Router();

const { PostModel } = require('../models/Post');

router
  .route('/')
  .get(async (req, res) => {
    // this will have more advanced filtering logic later on
    let post = await PostModel.find().populate('author', 'nickname firstName lastName profilePicture');
    console.log(post);
    res.status(200).send(post);
  })
  .post(async (req, res) => {
    try {
      await PostModel.create({ ...req.body, author: req.userInSession });
      res.status(200).send({ message: 'Entry Created' });
    } catch (err) {
      return res.status(406).send({ message: 'Error while creating post', error: err });
    }
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
  .route('/one')
  .get(async (req, res) => {
    let post = await PostModel.findOne(req.body.id);
    res.status(200).send(post);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
