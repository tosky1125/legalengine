// making API for testing: making revision
const {
    Law,
    Chapter,
    Article,
    Clause,
    Subparagraph,
    Item,
} = require('./models');

const {
    Op
} = require('sequelize');

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

const revision = async (
    law_number,
    law_eDate,
    article_id
) => {
    let result = {};
    // find law with it's id and it's enforcement date
    const lawResult = await Law.findOne({
        where: {
            number: law_number,
            enforcement_date: {
                [Op.lte]: law_eDate
            }
        },
        raw: true
    });
    result.Law = lawResult;

    // if article_id exist in parameters, find article and it's children table's result
    if (article_id) {
        let articleResult = await Article.findAll({
            where: {
                article_id: article_id,
                law_id: lawResult.law_id
            },
            raw: true
        });
        for (eachArticle of articleResult) {
            eachArticle.Clause = await clauseResult(eachArticle);
            for (eachClause of eachArticle.Clause) {
                eachClause.subPara = await subParaResult(eachClause);
                for(eachSubpara of eachClause.subPara) {
                    eachSubpara.Item = await itemResult(eachSubpara);
                }  
            }
        }
        result.Article = articleResult;
    }
    return result;
};

module.exports = revision;
