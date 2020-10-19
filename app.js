const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const searchRouter = require('./router/search');

const revision = require('./testR');

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

app.post('/', async (req, res) => {
  const { law_number, law_eDate, article_id} = req.body;
  res.send(await revision(law_number, new Date(law_eDate), article_id));
})


app.listen(port, () => {
  console.log(`server listen to port: ${port}`);
});
