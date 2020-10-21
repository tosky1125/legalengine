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

const revision = async (body) => {
    let {
        law_number,
        law_eDate,
        article_id,
        clause_id,
        sub_id,
        item_id
    } = body;
    
    law_eDate = new Date(String(law_eDate));
    
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
    const articleResults = await Article.findAll({
        where: {
            law_id: lawResult.law_id,
            article_id: article_id
        },
        raw: true
    });
    for (eachArticle of articleResults) {
        eachArticle.Clause = await clauseResult(eachArticle);
        for (eachClause of eachArticle.Clause) {
            eachClause.subPara = await subParaResult(eachClause);
            for(eachSubpara of eachClause.subPara) {
                eachSubpara.Item = await itemResult(eachSubpara);
            }  
        }
    }
    result.Article = articleResults[0];

    if (clause_id === null && sub_id === null && item_id === null) {
        return result;
    }
    else if (clause_id || clause_id === null) {
        let clauseResults = await Clause.findAll({
            where: {
                law_id: lawResult.law_id,
                article_id: result.Article.id,
                clause_id: clause_id
            },
            raw: true
        });
        for (eachClause of clauseResults) {
            eachClause.subPara = await subParaResult(eachClause);
            for(eachSubpara of eachClause.subPara) {
                eachSubpara.Item = await itemResult(eachSubpara);
            }  
        }
        result.Clause = clauseResults[0];
    }


    if (sub_id === null && item_id === null) {
        return result;
    }
    else if (sub_id || sub_id === null) {
        let subResults = await Subparagraph.findAll({
            where: {
                law_id: lawResult.law_id,
                article_id: result.Article.id,
                clause_id: result.Clause.id,
                sub_id: sub_id
            },
            raw: true
        });
        for(eachSubpara of subResults) {
            eachSubpara.Item = await itemResult(eachSubpara);
        } 
        result.subPara = subResults[0];
    }

    if (item_id) {
        let itemResults = await Item.findAll({
            where: {
                law_id: lawResult.law_id,
                article_id: result.Article.id,
                clause_id: result.Clause.id,
                sub_id: result.subPara.id,
                item_id: item_id
            },
            raw: true
        });
        result.Item = itemResults
    }
    return result;
};

module.exports = revision;
