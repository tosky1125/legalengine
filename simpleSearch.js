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
    Item
} = require('./models');
  
const {
    Op
} = require('sequelize');

const {
    rmSpaceAndSymbols, extractKeyword, parseDate
} = require('./strHandlerSet');

const lawResult = async (name, eDate, number) => {
    const refinedName = rmSpaceAndSymbols(name);
    const parsedDate = parseDate(eDate);
    const lawResult = await Law.findOne({
      where: {
          number: number,
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
      attributes: ['id', 'law_id', 'chapter_id', 'date', 'context'],
  });
  return chapterResult;
};

const articleResult = async (chapData) => {
    const articleResult = await Article.findAll({
      raw:true,
      where: {
          chapter_id: chapData.id
      },
      attributes: ['id', 'law_id', 'article_id', 'article_title', 'date'],
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

const simpleTotalData = async (name, eDate, number) => {
    let simpleTotalDataResult = {};
    const extractedKeyword = extractKeyword(name);
    const refinedKeyword = rmSpaceAndSymbols(extractedKeyword);
    const parsedDate = parseDate(eDate);

    const relatedLaws = await Law.findAll({
        group: 'refined_name',
        where: {
            refined_name: {
                [Op.substring]: refinedKeyword
            },
            enforcement_date: {
                [Op.lte]: parsedDate
            },
        },
        attributes: ['name', 'refined_name', 'promulgation_date', 'enforcement_date', 'number', 'amendment_status', 'type'],
        order: [['enforcement_date', 'DESC']],
        raw: true
    });

    
    // nested 구조 + 필요한 것들만
    simpleTotalDataResult.Law = await lawResult(name, eDate, number);
    simpleTotalDataResult.Law.Chapter = await chapterResult(simpleTotalDataResult.Law);
    for (eachChapter of simpleTotalDataResult.Law.Chapter) {
        eachChapter.Article = await articleResult(eachChapter);
    };
    // 연관법령
    simpleTotalDataResult.Related =  relatedLaws;
    // 첨부파일
    simpleTotalDataResult.Law.File = await fileResult(simpleTotalDataResult.Law);

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

module.exports = { simpleTotalData, findLawForInline };



