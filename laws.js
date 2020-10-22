const axios = require('axios');
const convert = require('xml-js');
const {
  Law,
  Ministry,
  Law_Type,
} = require('./models');

const monthToDate = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(4, 6);
  const day = string.slice(6);
  const result = `${year}-${month}-${day}`;
  return result;
};

let i = 138027 ;
const getLaws = async () => {
  let response = await axios.get(`http://www.law.go.kr/DRF/lawSearch.do?target=eflaw&OC=tosky0514&type=XML&display=1&page=${i}`);
  let data = convert.xml2json(response.data, {
    compact: true,
    spaces: 4,
  });
  data = JSON.parse(data);
  data = data.LawSearch.law;
  console.log(data);
    // await Ministry.findOrCreate({
    //   where: {
    //     name: data['소관부처명']._text
    //   },
    //   defaults: {
    //     name: data['소관부처명']._text,
    //   },
    // });
    // await Law_Type.findOrCreate({
    //   where: {
    //     type: data['법령구분명']._text
    //   },
    //   defaults: {
    //     type: data['법령구분명']._text,
    //   },
    // });

    // await Law.create({
    //   law_id: data._attributes.id,
    //   name: data['법령명한글']._cdata.replace('·', 'ㆍ'),
    //   number: data['법령일련번호']._text,
    //   promulgation_date: monthToDate(data['공포일자']._text),
    //   promulgation_number: data['공포번호']._text,
    //   type: data['법령구분명']._text,
    //   enforcement_date: monthToDate(data['시행일자']._text),
    //   ministry: data['소관부처명']._text,
    //   amendment_status: data['제개정구분명']._text,
    //   contexts: data['법령명한글']._cdata,
  // }
  // i += 1;
  // await getLaws();
};

getLaws();
