const { Law, sequelize } = require('../models');
const { Op } = require('sequelize');
const { extractKeyword } = require('../helpers/strHandlerSet');
const parse = require('date-fns/parse');

module.exports = {
  post: async (req, res) => {
    const { date, keyword } = req.body;
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const refinedKeyword = extractKeyword(keyword);
    console.log(refinedKeyword);

    // 만약 sort 된 경우에 빈 문자열이 나왔다면 
    if (refinedKeyword === '') {
      res.send([]);
    } else {
      const searchResult = await Law.findAll({
        // type 중에서 '헌법', '법률', '대통령령', '총리령', '대법원규칙' 이 나온다면 해당 순수대로 정렬해줍니다
        order: [
          [sequelize.fn('FIELD', sequelize.col('Law.type'), '대법원규칙', '총리령', '대통령령', '법률', '헌법'), "DESC"],
          ['enforcement_date', 'DESC']
        ],
        // SELECT * 이 아닌, 그 중에서도 필요한 요소들만을 추출합니다
        attributes: [
          'number', 'name', 'promulgation_date', 'enforcement_date', 'type', 'amendment_status', 'ministry'
        ],
        // enforcement_date 가 parsedDate 이전이고, refinedKeyword 를 포함한 (substring) refined_name 을 가진 Law Record 들을 찾습니다
        where: {
          enforcement_date: {
            [Op.lte]: parsedDate,
          },
          refined_name: {
            [Op.substring]: refinedKeyword,
          },
        },
        // 그리고 refined_name 으로 Grouping 을 해 줍니다 s
        group: 'refined_name',
        raw: true
      });
      res.send(searchResult);
    }
  },
};
