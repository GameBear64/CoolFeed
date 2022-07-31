const jwt = require('jsonwebtoken');
const settings = require('./../../settings.json');

const authRoutes = require('./Auth');
const userRoutes = require('./User');
const postRoutes = require('./Post');
const commentRoutes = require('./Comment');

module.exports = function (app) {
  app.use('/auth', authRoutes);

  app.use((req, res, next) => {
    try {
      var decoded = jwt.verify(req.headers.jwt, settings.secret);
      req.userInSession = decoded.id;
      next();
    } catch (err) {
      return res.status(403).send({ message: 'Not Authorized' });
    }
  });

  app.use('/user', userRoutes);
  app.use('/post', postRoutes);
  app.use('/comment', commentRoutes);

  app.use((req, res, next) => {
    res.status(404);

    //soon
    // respond with html page
    // if (req.accepts('html')) {
    //   res.render('404', { url: req.url });
    //   return;
    // }

    // respond with json
    if (req.accepts('json')) {
      res.json({ message: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
};
