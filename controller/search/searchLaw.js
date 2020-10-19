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
    let date = parse(req.body.date, 'yyyy-MM-dd', new Date());
    let keyword = req.body.searchWord;
    let searchResult = await Law.findAll({
      where: {
        name: {
          [Op.substring]: keyword,
        },
        enforcement_date: {
          [Op.lt]: date,
        },
      }, 
      order: [['name', 'ASC'], ['enforcement_date', 'DESC']],
      group: ['name'],
      raw: true
    });

    if (keyword.indexOf('법') !== -1) {
      let newkeyword = keyword.replace('법', '');
      let searchRelated = await Law.findAll({
        where: {
          name: {
            [Op.substring]: newkeyword
          },
          enforcement_date: {
            [Op.lt]: date,
          },
        }, raw : true,
      });
      searchRelated = searchRelated.filter(ele => ele.name !== keyword ? ele : false);
      searchResult = searchResult.concat(searchRelated);
    };
    res.send(searchResult);
  },
};
