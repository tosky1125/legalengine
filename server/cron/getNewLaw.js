const axios = require('axios');
const convert = require('xml-js');
const spec = require('./getLawDesc');
const init = require('./dbUpdate');
const diff = require('./contDiff');
const tag = require('./tagBuilder');
const {
  Law,
  Ministry,
  LawType,
} = require('../models/index');
const {
  rmSpaceAndSymbols
} = require('../helpers/strHandlerSet');
const apiKey = 'tosky0514'
const monthToDate = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(4, 6);
  const day = string.slice(6);
  const result = `${year}-${month}-${day}`;
  return result;
};

const getLaws = async () => {

  const date = new Date().toLocaleDateString('ko-KR').replace(/[^0-9]/g, '');
  const response = await axios.get(`https://www.law.go.kr/DRF/lawSearch.do?OC=${apiKey}&target=eflaw&type=XML&date=${date}&max=100`);
  let data = convert.xml2json(response.data, {
    compact: true,
    spaces: 4,
  });
  data = JSON.parse(data);
  data = data.LawSearch.law;
  console.log(data);
  let tmp = [];
  if (!Array.isArray(data)) {
    tmp.push(data);
    data = tmp;
  }
  for (ele of data) {
    console.log('hi');
    !ele['소관부처명']._text ? ele['소관부처명']._text = '부서명없음' : false;
    !ele['법령구분명']._text ? ele['법령구분명']._text = '법령구분명없음' : false;
    await Ministry.findOrCreate({
      where: {
        name: ele['소관부처명']._text,
      },
      defaults: {
        name: ele['소관부처명']._text,
      },
    });
    await LawType.findOrCreate({
      where: {
        type: ele['법령구분명']._text,
      },
      defaults: {
        type: ele['법령구분명']._text,
      },
    });
    const lawId = await Law.findOne({
      order: [
        ['law_id', 'DESC']
      ],
    })
    const law = await Law.create({
      law_id: lawId.law_id + 1,
      name: ele['법령명한글']._cdata,
      number: ele['법령일련번호']._text,
      promulgation_date: monthToDate(ele['공포일자']._text),
      promulgation_number: ele['공포번호']._text,
      type: ele['법령구분명']._text,
      enforcement_date: monthToDate(ele['시행일자']._text),
      ministry: ele['소관부처명']._text,
      amendment_status: ele['제개정구분명']._text,
      contexts: ele['법령명한글']._cdata,
      refined_name: rmSpaceAndSymbols(ele['법령명한글']._cdata),
    });
    const desc = await spec(law);
    await init(desc, law.law_id);
    await diff(law_id);
    await tag(law);
  }
};
// getLaws();
module.exports = getLaws;