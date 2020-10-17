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
  get: async (req, res) => {
    // lawName, lawNum, enfDate
    console.log(req.query);
    
    const law = await Law.findOne({
      where: {
        number:73554,
      }
    })
    const chapter = await Chapter.findAll({
      where: {
        law_id:619,
      }
    })
    const article = await Article.findAll({
      where: {
        law_id:619,
      }
    })
    const clause = await Clause.findAll({
      where: {
        law_id:619,
      }
    })
    const subPara = await Subparagraph.findAll({
      where: {
        law_id:619
      }
    })
    const item = await Item.findAll({
      where: {
        law_id:619
      }
    })

    res.send({
      law,
      chapter,
      article,
      clause,
      subPara,
      item,
    })
  },

  post: async (req, res) => {
    let date = parse(req.body.date, 'yyyy-MM-dd', new Date());
    let keyword = req.body.searchWord;
    let searchResult = await Law.findAll({
      where: {
        name: {
          [Op.substring]: keyword
        },
        enforcement_date: {
          [Op.lt]: date
        }
      }
    });
    res.send(searchResult);
  },
}

