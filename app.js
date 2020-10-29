const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// router for each endpoint
const searchRouter = require('./router/search');
const lawRouter = require('./router/law');
const revisionRouter = require('./router/revision');

const app = express();
const port = '80';
app.use(express.json()); 
app.use(express.urlencoded({
  extended: true,
}));

app.use(cors({
  origin: true,
}));

app.use(morgan('combined'));

app.use('/search', searchRouter);
app.use('/law', lawRouter);
app.use('/revision', revisionRouter);

app.get('/', async (req, res) => {
  res.send('home dir');
});

app.post('/', async (req, res) => {
  res.send('home dir');
});

app.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
