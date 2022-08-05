const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const md5 = require('md5');

const { likeMode } = require('../enums/likeMode.enum');

const { PostModel } = require('../models/Post');
const { ImageModel } = require('../models/Image');

router
  .route('/')
  .get(async (req, res) => {
    // this will have more advanced filtering logic later on
    let post = await PostModel.find().populate('images').populate('author', 'nickname firstName lastName profilePicture');
    res.status(200).send(post.reverse());
  })
  .post(async (req, res) => {
    try {
      let imageIds = await uploadImages(req.body.images, req);
      await PostModel.create({ ...req.body, author: req.userInSession, images: imageIds });
      res.status(200).send({ message: 'Entry Created' });
    } catch (err) {
      console.log(err);
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
  .route('/:id')
  .get(async (req, res) => {
    let post = await PostModel.findOne({ _id: ObjectId(req.params.id) })
      .populate('images')
      .populate('author', 'nickname firstName lastName profilePicture');
    res.status(200).send(post);
  })
  .patch((req, res) => {
    res.status(200).send({ message: 'Entry patched' });
  })
  .delete(async (req, res) => {
    let post = await PostModel.findOne({ _id: ObjectId(req.params.id) });

    await ImageModel.deleteMany({ _id: { $in: post.images } });
    //  same for comments
    // await ImageModel.deleteMany({ _id: { $in: post.images } });

    await post.delete();

    res.status(200).send({ message: 'Entry deleted' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/like/:id')
  .patch(async (req, res) => {
    let post = await PostModel.findOne({ _id: ObjectId(req.params.id) });

    if (post.likeMode === likeMode.Cheer) {
      await post.update({ $push: { likes: req.userInSession } }, { timestamps: false });
    } else {
      if (post.likes.includes(req.userInSession)) {
        await post.update({ $pull: { likes: req.userInSession } }, { timestamps: false });
      } else {
        await post.update({ $push: { likes: req.userInSession } }, { timestamps: false });
      }
    }

    // get most relevant info
    post = await PostModel.findOne({ _id: ObjectId(req.params.id) });

    res.status(200).send({ message: 'Entry patched', likes: post.likes.length });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

async function uploadImages(images, req) {
  if (!images) return;
  let imgIds = [];

  for (let i = 0; i < images.length; i++) {
    let imgObject = await ImageModel.create({ name: images[i].name, data: images[i].data, md5: md5(images[i].data), author: req.userInSession });

    imgIds.push(imgObject.id);
  }

  return imgIds;
}
module.exports = router;
