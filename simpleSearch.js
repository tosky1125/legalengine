const { 
    Law,
    File,
    Revision,
    LawType,
    Ministry,
    Chapter,
    Article,
    Clause,
    Subparagraph,
    Item,
    sequelize
} = require('./models');
  
const {
    Op
} = require('sequelize');

const {
    rmSpaceAndSymbols, extractKeyword, parseDate
} = require('./strHandlerSet');

const lawResult = async (name, eDate) => {
    const refinedName = rmSpaceAndSymbols(name);
    const parsedDate = parseDate(eDate);
    const lawResult = await Law.findOne({
      where: {
          enforcement_date: {
              [Op.lte]: parsedDate
          },
          refined_name: refinedName
      },
      raw: true
  });
  return lawResult;
};

const fileResult = async (lawData) => {
    const fileResult = await File.findAll({
        where: {
            law_id: lawData.law_id
        },
        raw: true,
    });
    return fileResult;
}

const chapterResult = async (lawData) => {
    const chapterResult = await Chapter.findAll({
      raw: true,
      where: {
          law_id: lawData.law_id
      },
      attributes: ['id', 'chapter_id', 'date', 'context'],
  });
  return chapterResult;
};

const articleResult = async (chapData) => {
    const articleResult = await Article.findAll({
      raw:true,
      where: {
          chapter_id: chapData.id
      },
      attributes: ['id', 'article_id', 'article_title', 'date'],
  });
  return articleResult;
};

const clauseResult = async (artData) => {
    const clauseResult = await Clause.findAll({
      raw: true,
      where: {
          article_id: artData.id
      }
  });
  return clauseResult;
};

const subParaResult = async (clauseData) => {
    const subParaResult = await Subparagraph.findAll({
      raw: true,
      where: {
          clause_id: clauseData.id
      }
  });
  return subParaResult;
};

const itemResult = async (subParaData) => {
    const itemResult = await Item.findAll({
      raw: true,
      where: {
          sub_id: subParaData.id
      }
  });
  return itemResult;
};

const simpleTotalData = async (name, eDate) => {
    let simpleTotalDataResult = {};
    const extractedKeyword = extractKeyword(name);
    const refinedKeyword = rmSpaceAndSymbols(extractedKeyword);
    const parsedDate = parseDate(eDate);

    const relatedLaws = await Law.findAll({
        order: [[sequelize.fn('FIELD', sequelize.col('Law.type'), '대법원규칙', '총리령', '대통령령', '법률', '헌법'), "DESC"]],
        attributes: ['name', 'refined_name', 'promulgation_date', 'enforcement_date', 'number', 'amendment_status', 'type'],
        where: {
            enforcement_date: {
                [Op.lte]: parsedDate
            },
            refined_name: {
                [Op.substring]: refinedKeyword
            },
        },
        group: 'refined_name',
        raw: true
    });

    simpleTotalDataResult.Related =  relatedLaws;

    simpleTotalDataResult.Law = await lawResult(name, eDate);
    simpleTotalDataResult.Law.Chapter = await chapterResult(simpleTotalDataResult.Law);
    for (eachChapter of simpleTotalDataResult.Law.Chapter) {
        eachChapter.Article = await articleResult(eachChapter);
    };

    simpleTotalDataResult.File = await fileResult(simpleTotalDataResult.Law);

    return simpleTotalDataResult;
};

const findLawForInline = async (name, eDate) => {
    const refinedName = rmSpaceAndSymbols(name);
    const parsedDate = parseDate(eDate);
    const findLawNAttrs = await Law.findOne({
        where: {
            refined_name: refinedName,
            enforcement_date: {
                [Op.lte]: parsedDate
            }
        },
        raw: true
    });
    console.log(findLawNAttrs);
    return findLawNAttrs;
};

const nestedDataFinder = async (name, eDate, number) => {
    let nestedData = {};

    nestedData.Law = await lawResult(name, eDate, number);
    nestedData.Law.File = await fileResult(nestedData.Law);
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
}

module.exports = { simpleTotalData, findLawForInline };