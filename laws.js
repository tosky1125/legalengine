const axios = require('axios');
const convert = require('xml-js');
const {
  Law,
  Ministry,
  LawType
} = require('./models');
const { rmSpaceAndSymbols } = require('./strHandlerSet');

const monthToDate = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(4, 6);
  const day = string.slice(6);
  const result = `${year}-${month}-${day}`;
  return result;
};

let i = 1;
const getLaws = async () => {
  let response = await axios.get(`http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&type=XML&display=100&page=${i}`)
  let data = convert.xml2json(response.data, {
    compact: true,
    spaces: 4,
  });
  data = JSON.parse(data);
  data = data.LawSearch.law;
  
  for(ele of data){
    !ele['소관부처명']._text ? ele['소관부처명']._text = '부서명없음' : false;
    !ele['법령구분명']._text ? ele['법령구분명']._text = '법령구분명없음' : false;
    await Ministry.findOrCreate({
      where: {
        name: ele['소관부처명']._text
      },
      defaults: {
        name: ele['소관부처명']._text,
      },
    });
    await LawType.findOrCreate({
      where: {
        type: ele['법령구분명']._text
      },
      defaults: {
        type: ele['법령구분명']._text,
      },
    });
    await Law.create({
      law_id: ele._attributes.id,
      name: ele['법령명한글']._cdata,
      number: ele['법령일련번호']._text,
      promulgation_date: monthToDate(ele['공포일자']._text),
      promulgation_number: ele['공포번호']._text,
      type: ele['법령구분명']._text,
      enforcement_date: monthToDate(ele['시행일자']._text),
      ministry: ele['소관부처명']._text,
      amendment_status: ele['제개정구분명']._text,
      contexts: ele['법령명한글']._cdata,
      refined_name : rmSpaceAndSymbols(ele['법령명한글']._cdata),
    });
  };
  i++;

  await getLaws();
};

getLaws();