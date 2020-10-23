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
const parse = require('date-fns/parse');
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
    res.send(searchResult);
  },
};
