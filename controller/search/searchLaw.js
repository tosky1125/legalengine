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
  rmSpaceAndSymbols, extractKeyword
} = require('../../strHandlerSet');
const parse = require('date-fns/parse');
const totalData = require('../../searchNested');
module.exports = {
  get: async (req, res) => {
    const {
      lawName,
      lawNum,
      enfDate
    } = req.query;
    res.send(await totalData(lawName, enfDate, lawNum));
  },

  post: async (req, res) => {
    const { date, searchWord } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const refinedKeyword = rmSpaceAndSymbols(searchWord).replace('법', '');

    const searchResult = await Law.findAll({
      where: {
        refined_name: {
          [Op.substring]: refinedKeyword,
        },
        enforcement_date: {
          [Op.lte]: parsedDate,
        },
      },
      group: ['refined_name'],
      order: [['enforcement_date', 'DESC']],
      raw: true
    });
    res.send(searchResult);
  },
};
