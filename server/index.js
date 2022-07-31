const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const settings = require('./../settings.json');

mongoose
  .connect(`mongodb://localhost:${settings.mongoPort}/${settings.mongoDbName}`)
  .then(async () => {
    console.log(`Connected to ${settings.mongoDbName} at mongoDB`);
  })
  .catch(e => {
    console.log('Something went wrong', e);
  });

app.use(cookieParser());
app.use(cors());
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
