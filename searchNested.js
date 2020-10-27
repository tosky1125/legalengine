const { 
  Article,
  Chapter,
  Clause,
  Item,
  Law_Type,
  Law,
  File,
  Ministry,
  Revision,
  Subparagraph
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
      raw: true
  });
  return fileResult;
}
const chapterResult = async (lawData) => {
  const chapterResult = await Chapter.findAll({
    raw: true,
    where: {
        law_id: lawData.law_id
    }
});
return chapterResult;
};
const articleResult = async (chapData) => {
  const articleResult = await Article.findAll({
    raw:true,
    where: {
        chapter_id: chapData.id
    }
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
const totalData = async (name, eDate, number) => {
  let nestedData = {};
  const extractedKeyword = extractKeyword(name);
  const refinedKeyword = rmSpaceAndSymbols(extractedKeyword);
  const parsedDate = parseDate(eDate);
  const relatedLaws = await Law.findAll({
      where: {
          refined_name: {
              [Op.substring]: refinedKeyword
          },
          enforcement_date: {
              [Op.lte]: parsedDate
          },
      },
      order: [['enforcement_date', 'DESC']],
      group: ['refined_name'],
      raw: true
  });
  nestedData.Related =  relatedLaws;
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
  return nestedData;
};
module.exports = totalData;