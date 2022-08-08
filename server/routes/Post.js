const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const md5 = require('md5');

const { likeMode } = require('../enums/likeMode.enum');

const { PostModel } = require('../models/Post');
const { ImageModel } = require('../models/Image');

const filterEditedResponse = ({ status, body, images }) => {
  let newImages = images.filter(img => !img.author);
  images = images.filter(img => img.author).map(img => img._id);

  return { status, body, images, newImages };
};

router.route('/page/:page').get(async (req, res) => {
  // this will have more advanced filtering logic later on
  console.log(req.params.page);

  let count = await PostModel.count({});

  // prettier-ignore
  let posts = await PostModel
  .find()
  .sort({ createdAt: -1 })
  .skip(req.params.page * 10)
  .limit(10)
  .populate('images')
  // .populate('comments')
  .populate('author', 'nickname firstName lastName profilePicture');

  res.status(200).send({ posts, count });
});

router
  .route('/')
  .post(async (req, res) => {
    try {
      let imageIds = await uploadImages(req.body.images, req);
      await PostModel.create({ ...req.body, author: req.userInSession, images: imageIds });
      res.status(200).send({ message: 'Entry Created' });
    } catch (err) {
      return res.status(406).send({ message: 'Error while creating post', error: err });
    }
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    let post = await PostModel.findOne({ _id: ObjectId(req.params.id) })
      .populate('images')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: ['nickname', 'firstName', 'lastName', 'profilePicture'],
        },
      })
      .populate('author', 'nickname firstName lastName profilePicture');

    res.status(200).send(post);
  })
  .patch(async (req, res) => {
    let id = req.body._id;
    try {
      let response = filterEditedResponse(req.body);
      let imageIds = await uploadImages(response.newImages, req);
      delete response.newImages;

      response.images = response.images.concat(imageIds);
      await PostModel.updateOne({ _id: ObjectId(id) }, response);

      return res.status(200).send({ message: 'Entry patched' });
    } catch (err) {
      return res.status(406).send({ message: 'Error while creating post', error: err });
    }
  })
  .delete(async (req, res) => {
    let post = await PostModel.findOne({ _id: ObjectId(req.params.id) });

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

router.route('/byuser/:authorId/:page').get(async (req, res) => {
  // this will have more advanced filtering logic later on

  let count = await PostModel.count({ author: req.params.authorId });

  // prettier-ignore
  let posts = await PostModel
    .find({author: req.params.authorId})
    .sort({ createdAt: -1 })
    .skip(req.params.page * 10)
    .limit(10)
    .populate('images')
    // .populate('comments')
    .populate('author', 'nickname firstName lastName profilePicture');

  res.status(200).send({ posts, count });
});

async function uploadImages(images, req) {
  if (!images) return;
  let imgIds = [];

  for (let i = 0; i < images.length; i++) {
    let foundImage = await ImageModel.findOne({ md5: md5(images[i].data) });

    if (foundImage) {
      imgIds.push(foundImage.id);
    } else {
      let imgObject = await ImageModel.create({ name: images[i].name, data: images[i].data, md5: md5(images[i].data), author: req.userInSession });

      imgIds.push(imgObject.id);
    }
  }

  return imgIds;
}
module.exports = router;
