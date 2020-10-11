const {
  LAW,
  ARTICLE,
  CHAPTER,
  CLAUSE,
  ITEM
} = require('./models')

module.exports = {
  searchLaw: async (req, res) => {
    const {
      number,
      enforcement_date
    } = req.body;
    const law = await LAW.findOne({
      where: {
        number,
        enforcement_date
      }
    })
    const chapter = await CHAPTER.findAll({
      where: {
        law_id: number,
        date: enforcement_date
      }
    })
    const article = await ARTICLE.findAll({
      where: {
        law_id: number,
        date: enforcement_date
      }
    })
    const clause = await CLAUSE.findAll({
      where: {
        law_id: number,
        date: enforcement_date
      }
    })
    const item = await ITEM.findAll({
      where: {
        law_id: number,
        date: enforcement_date
      }
    })

    res.send({
      law,
      chapter,
      article,
      item
    })
  }
}