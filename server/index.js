const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const settings = require('./../settings.json');

mongoose
  .connect(`mongodb://127.0.0.1:${settings.mongoPort}/${settings.mongoDbName}`)
  .then(async () => {
    console.log(`Connected to ${settings.mongoDbName} at mongoDB`);
  })
  .catch(e => {
    console.log('Something went wrong', e);
  });

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

require('./routes/index')(app);

app.get('/', (req, res) => {
  res.send(`Express server using MongoDB for CoolFeed, change port from ${settings.expressPort} to 3000`);
});

app.listen(settings.expressPort, () => {
  console.log(`Server listening on port ${settings.expressPort} at http://localhost:${settings.expressPort}`);
});
