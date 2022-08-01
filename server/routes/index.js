const jwt = require('jsonwebtoken');
const settings = require('./../../settings.json');

const authRoutes = require('./Auth');
const userRoutes = require('./User');
const postRoutes = require('./Post');
const commentRoutes = require('./Comment');

module.exports = function (app) {
  //special auth routes (special coz they are above the auth check)
  app.use('/auth', authRoutes);

  // auth check
  app.use((req, res, next) => {
    console.log(jwt.verify(req.headers.jwt, settings.secret));
    try {
      var decoded = jwt.verify(req.headers.jwt, settings.secret);
      req.userInSession = decoded.id;
      next();
    } catch (err) {
      return res.status(403).send({ message: 'Not Authorized' });
    }
  });

  // routes
  app.use('/user', userRoutes);
  app.use('/post', postRoutes);
  app.use('/comment', commentRoutes);

  //if 404
  app.use((req, res, next) => res.status(404).send({ message: 'Not found' }));
};
