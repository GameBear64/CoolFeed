const userRoutes = require('./User');
// import settings secret
// import jwt

module.exports = function (app) {
  //possibly auth before token check?
  //or we can check inside the middleware if the path is a user create

  // app.use(/* here goes auth with jwt*/)

  app.use('/user', userRoutes);

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
