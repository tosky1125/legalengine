const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
const convert = require('xml-js');
const qs = require("querystring")

const app = express();
const port = '80';
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({
  origin: true
}));
app.use(morgan('combined'));
// app.get('/', (req, res) => res.send('hello world'));
// app.get('/data', (req, res) => {
  axios.get("http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&type=XML").then(response => {
    let data = convert.xml2json(response.data, {
      compact: true,
      spaces: 4
    });
    data = JSON.parse(data);
    console.log(data);
  })
// });

// axios.get("http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&query=" + keyword)
//   .then(response => {
//     let data = convert.xml2json(response.data, {
//       compact: true,
//       spaces: 4
//     });
//     data = JSON.parse(data);
//     console.log(data)
//   })
// app.listen(port, console.log(`server is listening to port ${port}`));