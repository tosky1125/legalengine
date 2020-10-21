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
    Op
  } = require('sequelize');

  const lawResult = async (name, eDate, number) => {
    let lawResult = await Law.findOne({
      where: {
          number: number,
          enforcement_date: {
              [Op.lte]: eDate
          },
          name: {
              [Op.substring]: name
          }
      },
      raw: true
  });
  return lawResult;
};

const chapterResult = async (lawData) => {
  let chapterResult = await Chapter.findAll({
      raw: true,
      where: {
          law_id: lawData.law_id
      }
  });
  return chapterResult;
};

const articleResult = async (chapData) => {
  let articleResult = await Article.findAll({
      raw:true,
      where: {
          chapter_id: chapData.id
      }
  });
  return articleResult;
};

const clauseResult = async (artData) => {
  let clauseResult = await Clause.findAll({
      raw: true,
      where: {
          article_id: artData.id
      }
  });
  return clauseResult;
};

const subParaResult = async (clauseData) => {
  let subParaResult = await Subparagraph.findAll({
      raw: true,
      where: {
          clause_id: clauseData.id
      }
  });
  return subParaResult;
};

const itemResult = async (subParaData) => {
  let itemResult = await Item.findAll({
      raw: true,
      where: {
          sub_id: subParaData.id
      }
  });
  return itemResult;
};

const totalData = async (name, eDate, number) => {
    let nestedData = {};

    const keyword = name.replace('법', '').replace('시행령', '').replace('법령', '').replace('법률', '').replace('규칙', ''); 
    const related = await Law.findAll({
        where: {
                [Op.or]: [
                    {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법'}}]},
                    {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '시행령'}}]},
                    {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법령'}}]},
                    {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법률'}}]},
                    {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '규칙'}}]},
                    ],
                },
        order: [['name', 'ASC'], ['enforcement_date', 'DESC']],
        group: ['name'],
        raw: true
    });
    nestedData.Related = related;


    nestedData.Law = await lawResult(name, eDate, number);
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

