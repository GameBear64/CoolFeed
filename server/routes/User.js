const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

const { UserModel } = require('../models/User');

router
  .route('/')
  .get(async (req, res) => {
    console.log(req.userInSession);
    console.log(req.body);
    let userInfo = await UserModel.find();
    res.status(200).send(userInfo);
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
    console.log(req.body);
    let userInfo = await UserModel.findOne({ _id: ObjectId(req.params.id) });
    res.status(200).send(userInfo);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
