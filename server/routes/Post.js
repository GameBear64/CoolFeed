const router = require('express').Router();
const md5 = require('md5');

const { PostModel } = require('../models/Post');
const { ImageModel } = require('../models/Image');

router
  .route('/')
  .get(async (req, res) => {
    console.log('aaa');
    // this will have more advanced filtering logic later on
    let post = await PostModel.find().populate('author', 'nickname firstName lastName profilePicture').populate('images');
    // console.log(post);
    res.status(200).send(post);
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
    let post = await PostModel.findOne(req.params.id);
    res.status(200).send(post);
  })
  .patch((req, res) => {
    res.status(200).send({ message: 'Entry patched' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

router
  .route('/like/:id')
  .patch(async (req, res) => {
    let rez = await PostModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.userInSession } });
    console.log(rez);
    res.status(200).send({ message: 'Entry patched' });
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

async function uploadImages(images, req) {
  let imgIds = [];

  for (let i = 0; i < images.length; i++) {
    let imgObject = await ImageModel.create({ name: images[i].name, data: images[i].data, md5: md5(images[i].data), author: req.userInSession });

    imgIds.push(imgObject.id);
  }

  return imgIds;
}
module.exports = router;
