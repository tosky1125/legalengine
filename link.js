const axios = require("axios");
const cheerio = require("cheerio");
const convert = require('xml-js');
const {
  LAW
} = require('./models');

const pad = (str) => {
  return str.length === 1 ? str.padStart(2, '0') : str
}
const linkUrl = () => {
  LAW.findOne({
    where: {
      id: i
    }
  }).then(data => {
    var year = String(data.enforcement_date.getFullYear())
    var month = String(data.enforcement_date.getMonth() + 1)
    var date = String(data.enforcement_date.getDate())
    month = pad(month);
    date = pad(date);
    var fullDate = `${year}${month}${date}`
    console.log(fullDate)
    return axios.get(`http://www.law.go.kr/DRF/lawService.do?OC=tosky0514&target=eflaw&MST=${data.number}&efYd=${fullDate}&type=html`)
      .then(res => {
        const $ = cheerio.load(res.data);
        let a = $('iframe').attr('src')
        return a
      })
  }).then(url => {
    LAW.update({
      contexts: url
    }, {
      where: {
        id: i
      }
    })
  }).then(() => i++)
}

let i = 1
setInterval(linkUrl, 300, i)