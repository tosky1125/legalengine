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
  
  module.exports = {
    post: async (req, res) => {
      const { law_name, law_eDate } = req.body
      const parsedDate = parse(law_eDate, 'yyyy-MM-dd', new Date());
      const lawInText = await Law.findOne({
        where: {
          name: {
            [Op.substring]: law_name
          },
          enforcement_date: {
            [Op.lte]: parsedDate
          },
        },
        raw: true
      });
      res.send(lawInText);
    }
  };
  