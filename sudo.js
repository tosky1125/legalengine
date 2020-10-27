const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const result = require('./crawl/abc');
app.use(cors());
app.get('/', async (req, res) => {
  let answer = await result();
  res.send(JSON.stringify(answer));
});
app.listen(port);