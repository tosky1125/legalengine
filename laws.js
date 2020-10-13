const {
  Law
} = require('./models');
const axios = require('axios');
const convert = require('xml-js');

let monthToDate = (string) => {
  let year = string.slice(0, 4);
  let month = string.slice(4, 6);
  let day = string.slice(6);
  let result = `${year}-${month}-${day}`
  return result;
}

let getLaws = () => {
  axios.get(`http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&type=XML&display=1&page=${i}`).then(response => {
    let data = convert.xml2json(response.data, {
      compact: true,
      spaces: 4
    });
    data = JSON.parse(data);
    data = data.LawSearch.law
    console.log(data);
    // data.forEach(ele => {
      console.log(data['소관부처명']._text)
      Law.create({
        name: data['법령명한글']._cdata,
        number: data['법령일련번호']._text,
        promulgation_date: monthToDate(data['공포일자']._text),
        promulgation_number: data['공포번호']._text,
        type: data['법령구분명']._text,
        enforcement_date: monthToDate(data['시행일자']._text),
        ministry: data['소관부처명']._text,
        amendment_status: data['제개정구분명']._text,
        contexts: data['법령명한글']._cdata
      })
    // })
    i++;
  })
}

let i = 1;
setInterval(getLaws, 3000, i)

