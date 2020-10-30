const { Law, sequelize } = require('../models');
const { Op } = require('sequelize');
const { rmSpaceAndSymbols } = require('../strHandlerSet');
const parse = require('date-fns/parse');

module.exports = {
  post: async (req, res) => {
    const { date, searchWord } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    let refinedKeyword;

    if (searchWord.length < 3) {
      refinedKeyword = rmSpaceAndSymbols(searchWord);
    } else {
      refinedKeyword = rmSpaceAndSymbols(searchWord).replace('법', '');
    }

    const searchResult = await Law.findAll({
      order: [
        ['enforcement_date', 'DESC'],
        [sequelize.fn('FIELD', sequelize.col('Law.type'), '대법원규칙', '총리령', '대통령령', '법률', '헌법'), "DESC"]
      ],
      attributes: [
        'number', 'name', 'promulgation_date', 'enforcement_date', 'type', 'amendment_status', 'ministry'
      ],
      where: {
        enforcement_date: {
          [Op.lte]: parsedDate,
        },
        refined_name: {
          [Op.substring]: refinedKeyword,
        },
      },
      group: 'refined_name',
      raw: true
    });
    console.log(parsedDate);
    console.log(searchResult);
    res.send(searchResult);
  },
};
