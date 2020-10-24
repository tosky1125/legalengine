const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require("../../models");
const {
  Op
} = require('sequelize');
const { 
  rmSpaceAndSymbols
} = require('../../strHandlerSet');
const parse = require('date-fns/parse');
const differenceInDays = require('date-fns/differenceInDays');
const totalData = require('../../searchNested');
module.exports = {
  get: async (req, res) => {
    const {
      lawName,
      lawNum,
      enfDate
    } = req.query;
    res.send(await totalData(lawName, new Date(String(enfDate)), lawNum));
  },

  post: async (req, res) => {
    // request 에 들어온 date 와 searchWord 를 통해 DB에서 조건을 충족하는 법을 검색한다
    const { date, searchWord } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    // 그러나, searchWord 에 '법' 이라는 string 이 들어오면 해당 법'만' 검색되기 때문에, 일단은 법이 들어오는 경우 잘라주었다
    const newkeyword = searchWord.replace('법', '');

    // 위의 가공을 거친 newKeyword 와 date 를 통해 법을 검색하고, 법의 이름 기준으로 group by 를 실행하면서, 해당 법들을 최신순으로 정렬한다
    const searchResult = await Law.findAll({
      where: {
        name: {
          [Op.substring]: newkeyword,
        },
        enforcement_date: {
          [Op.lt]: parsedDate,
        },
      },
      order: [['name', 'ASC'], ['enforcement_date', 'DESC']],
      group: ['name'],
      raw: true
    });
    
    // 특수문자 및 공백을 제외한 이름이 같으나, 이름 자체가 다른 두 법의 비교가 이뤄진다면 밑의 2개짜리 for loop 을 통해 lawPair 에 두 쌍을 할당해준다
    let lawPair;
    for (eachLaw of searchResult) {
      for (targetLaw of searchResult) {
        if (rmSpaceAndSymbols(eachLaw.name) === rmSpaceAndSymbols(targetLaw.name) && eachLaw.name !== targetLaw.name) {
          lawPair = [eachLaw, targetLaw];
        }
      }
    }

    // 그러나, lawPair 에 아무값도 담기지 않아 해당 값이 undefined 라면, 그냥 searchResult 를 response 로 보내준다 
    if (lawPair === undefined) {
      res.send(searchResult);
    }

    // lawPair 가 undefined 가 아니라면, 이제 법의 검색 결과에서 이전 법을 제외해준다
    if (differenceInDays(lawPair[0].enforcement_date, lawPair[1].enforcement_date) > 0) {
      const oldLaw = lawPair[1];
      const filteredResult = searchResult.filter(result => result.name !== oldLaw.name);
      res.send(filteredResult);
    } else {
      const oldLaw = lawPair[0];
      const filteredResult = searchResult.filter(result => result.name !== oldLaw.name);
      res.send(filteredResult);
    }
  },
};
