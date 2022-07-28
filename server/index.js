const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Ya got me');
  console.log('ya');
});

app.listen(3030, () => {
  console.log(`Listening on port 3030`);
});
