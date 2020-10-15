const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const searchRouter = require('./router/search');

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
app.get('/', (req, res) => res.send('hello world'));


app.listen(port);

