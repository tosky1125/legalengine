const {
  LAW
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
  console.log(i)
  axios.get(`http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&type=XML&display=100&page=${i}`).then(response => {
    let data = convert.xml2json(response.data, {
      compact: true,
      spaces: 4
    });
    data = JSON.parse(data);
    data = data.LawSearch.law
    data.forEach(ele => {
      LAW.create({
        law_id: ele['법령ID']._text,
        name: ele['법령명한글']._cdata,
        number: ele['법령일련번호']._text,
        promulgation_date: monthToDate(ele['공포일자']._text),
        promulgation_number: ele['공포번호']._text,
        type: ele['법령구분명']._text,
        enforcement_date: monthToDate(ele['시행일자']._text),
        ministry: ele['소관부처명']._text,
        amendment_status: ele['제개정구분명']._text,
        contexts: ele['법령상세링크']._text
      })
    })
    i++;
  })
}

let i = 1;
setInterval(getLaws, 3000, i)

137982