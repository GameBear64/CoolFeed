const router = require('express').Router();
const { UserModel } = require('../models/User');

router
  .route('/')
  .get(async (req, res) => {
    console.log(req.body);
    let userInfo = await UserModel.find();
    res.status(200).send(userInfo);
  })
  .post((req, res) => {
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
  .route('/one')
  .get(async (req, res) => {
    console.log(req.body);
    let userInfo = await UserModel.findOne(req.body);
    res.status(200).send(userInfo);
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Use another method' });
  });

module.exports = router;
