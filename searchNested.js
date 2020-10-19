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
    let nestedData = {};

    // let related = await Law.findAll({
    //     where: {
    //       [Op.or]: [
    //         {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법'}}]},
    //         {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '시행령'}}]},
    //         {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법령'}}]},
    //         {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '법률'}}]},
    //         {[Op.and]: [{name: {[Op.substring]: keyword}}, {name: {[Op.substring]: '규칙'}}]},
    //       ]
    //     },
    //     raw: true
    //   });

    if (name.indexOf('법') !== -1) {
        let newName = name.replace('법', ''); 
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
    } else {
        let relatedSearch = await Law.findAll({
            where: {
                enforcement_date: {
                    [Op.lte]: eDate
                },
                name: {
                    [Op.substring]: name
                },
            },
            order: [['name', 'ASC'], ['enforcement_date', 'DESC']],
            group: ['name'],
            raw: true
        });
        nestedData.Related = relatedSearch;
    }

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

