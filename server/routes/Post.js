const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'info' });
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

module.exports = router;
