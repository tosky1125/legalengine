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
    const { date, searchWord } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const newkeyword = searchWord.replace('법', '');

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
    
    let lawPair;
    for (eachLaw of searchResult) {
      for (targetLaw of searchResult) {
        if (rmSpaceAndSymbols(eachLaw.name) === rmSpaceAndSymbols(targetLaw.name) && eachLaw.name !== targetLaw.name) {
          lawPair = [eachLaw, targetLaw];
        }
      }
    }
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
