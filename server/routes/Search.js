const router = require('express').Router();

const { searchTypes } = require('../enums/searchTypes.enum');

const { PostModel } = require('../models/Post');
const { UserModel } = require('../models/User');

router.route('/:type/:term').get(async (req, res) => {
  if (req.params.type === searchTypes.Posts) {
    let result = await PostModel.find({ body: { $regex: req.params.term, $options: 'i' } })
      .limit(10)
      .populate('images')
      .populate('author', 'nickname firstName lastName profilePicture');

    return res.status(200).send(result);
  } else if (req.params.type === searchTypes.Users) {
    let result = await UserModel.find({ $or: [{ firstName: { $regex: req.params.term, $options: 'i' } }, { lastName: { $regex: req.params.term, $options: 'i' } }, { nickname: { $regex: req.params.term, $options: 'i' } }] }).limit(10);

    return res.status(200).send(result);
  } else {
    return res.status(406).send({ message: 'Please specify what type of search' });
  }
});

module.exports = router;
