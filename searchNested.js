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
    Op, Sequelize
  } = require('sequelize');
const { closestIndexTo } = require('date-fns');

let lawResult = async (name, eDate, number) => {
    console.log(name);
    console.log(eDate);
    console.log(number);
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
  console.log(lawResult);
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

let totalData = async (name, eDate, number) => {
    console.log(`name: ${name}, eDate: ${eDate}, number: ${number}`);

    let nestedData = {};
    console.log(`name: ${name}`);
    let newName = name.replace('법률', '').replace('법','').replace('시행령','').replace('규칙','');
    console.log(`newName: ${newName}`);
    let relatedSearch = await Law.findAll({
        where: {
            enforcement_date: {
                [Op.lte]: eDate
            },
            name: {
                [Op.substring]: newName
            },
        },
        order: [['name', 'ASC'], ['enforcement_date', 'DESC']],
        group: ['name'],
        raw: true
    });
    nestedData.Related = relatedSearch;

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

