const { Law, sequelize } = require('../models');
const { Op } = require('sequelize');
const { rmSpaceAndSymbols } = require('../strHandlerSet');
const parse = require('date-fns/parse');

module.exports = {
  post: async (req, res) => {
    const { date, searchWord } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const refinedKeyword = rmSpaceAndSymbols(searchWord).replace('법', '');

    const searchResult = await Law.findAll({
      where: {
        enforcement_date: {
          [Op.lte]: parsedDate,
        },
        refined_name: {
          [Op.substring]: refinedKeyword,
        },
      },
      group: ['refined_name'],
      order: [[sequelize.fn('FIELD', sequelize.col('type'), '법률', '대통령령', '총리령', '대법원규칙')]],
      raw: true
    });
    res.send(searchResult);
  },
};
