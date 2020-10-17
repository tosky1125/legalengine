const { 
    Article,
    Chapter,
    Clause,
    Item,
    Law_Type,
    Law,
    Ministry,
    Revision,
    Subparagraph
  } = require('./models');
  
  const {
    Op, Sequelize, where
  } = require('sequelize');

let lawResult = async (name, number, eDate) => {
  let lawResult = await Law.findOne({
      where: {
          number: number,
          enforcement_date: {
              [Op.lte]: eDate
          },
          name: name
      },
      raw: true
  });
  return lawResult;
};

let chapterResult = async (lawData) => {
  let chapterResult = await Chapter.findAll({
      raw: true,
      where: {
          law_id: lawData.law_id
      }
  });
  return chapterResult;
};

let articleResult = async (chapData) => {
  let articleResult = await Article.findAll({
      raw:true,
      where: {
          chapter_id: chapData.id
      }
  });
  return articleResult;
};

let clauseResult = async (artData) => {
  let clauseResult = await Clause.findAll({
      raw: true,
      where: {
          article_id: artData.id
      }
  });
  return clauseResult;
};

let subParaResult = async (clauseData) => {
  let subParaResult = await Subparagraph.findAll({
      raw: true,
      where: {
          clause_id: clauseData.id
      }
  });
  return subParaResult;
};

let itemResult = async (subParaData) => {
  let itemResult = await Item.findAll({
      raw: true,
      where: {
          sub_id: subParaData.id
      }
  });
  return itemResult;
};

let totalData = async (number, eDate, name) => {
    let nestedData = {};
    nestedData.Law = await lawResult(number, eDate, name);
    nestedData.Law.Chapter = await chapterResult(nestedData.Law);

    for (eachChapter of nestedData.Law.Chapter) {
        eachChapter.Article = await articleResult(eachChapter);
        for (eachArticle of eachChapter.Article) {
            eachArticle.Clause = await clauseResult(eachArticle);
            for (eachClause of eachArticle.Clause) {
                eachClause.subPara = await subParaResult(eachClause);
                for (eachSubpara of eachClause.subPara) {
                    eachSubpara.Item = await itemResult(eachSubpara);
                };
            };
        };
    };
    return nestedData;
};

module.exports = totalData;

