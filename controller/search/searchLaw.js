const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require("../../models/subparagraph")
const {
  Op
} = require('sequelize');
const parse = require('date-fns/parse');

module.exports = {
  get: async (req, res) => {
    let {
      id,
      date,
    } = req.params
    const law = await Law.findOne({
      where: {
        id,
        date
      }
    })
    const chapter = await Chapter.findAll({
      where: {
        law_id,
      }
    })
    const article = await Article.findAll({
      where: {
        law_id,
      }
    })
    const clause = await Clause.findAll({
      where: {
        law_id,
      }
    })
    const subPara = await Subparagraph.findAll({
      where: {
        law_id
      }
    })
    const item = await Item.findAll({
      where: {
        law_id
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

