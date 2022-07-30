const express = require('express');
const app = express();
const mongoose = require('mongoose');
const settings = require('./../settings.json');

// const { PostModel } = require('./models/Post');
// const { UserModel } = require('./models/User');

mongoose
  .connect(`mongodb://localhost:${settings.mongoPort}/${settings.mongoDbName}`)
  .then(async () => {
    // let post = await UserModel.create({ firstName: 'Vladi', email: 'Best@mail.cool', password: 'hdnsjfnfjndfk' });
    // console.log(post);
    // let post = await PostModel.create({ title: 'title here', body: 'body here' });
    // console.log(post);
    console.log(`Connected to ${settings.mongoDbName} at mongoDB`);
  })
  .catch(e => {
    console.log('Something went wrong', e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

app.get('/', (req, res) => {
  res.send('Ya got me');
  console.log('ya');
});

app.listen(settings.expressPort, () => {
  console.log(`Server listening on port ${settings.expressPort} at http://localhost:${settings.expressPort}`);
});
