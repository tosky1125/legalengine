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
  
  const parse = require('date-fns/parse');

let lawResult = async (number, eDate, name) => {
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
    // console.log(lawResult);
    if (!lawResult) {
        return 'no law result';
    } else {
        return lawResult;
    }
};

let chapterResult = async (lawData) => {
    let chapterResult = await Chapter.findAll({
        raw: true,
        where: {
            law_id: lawData.law_id
        }
    });
    console.log(chapterResult);
    if (!chapterResult) 
    return chapterResult;
};

let articleResult = async (chapData) => {
    let articleResult = await Article.findAll({
        raw:true,
        where: {
            chapter_id: chapData.id
        }
    });
    console.log(articleResult);
    return articleResult;
};

let clauseResult = async (artData) => {
    let clauseResult = await Clause.findAll({
        raw: true,
        where: {
            article_id: artData.id
        }
    });
    console.log(clauseResult);
    return clauseResult;
};

let subParaResult = async (clauseData) => {
    let subParaResult = await Subparagraph.findAll({
        raw: true,
        where: {
            clause_id: clauseData.id
        }
    });
    console.log(subParaResult);
    return subParaResult;
};

let itemResult = async (subParaData) => {
    let itemResult = await Item.findAll({
        raw: true,
        where: {
            sub_id: subParaData.id
        }
    });
    console.log(itemResult);
    return itemResult;
};

let totalData = async (number, eDate, name) => {
    let lawData = await lawResult(number, eDate, name);
    // 1. set chapter to each law
    let nestedResult = lawData.map(eachLaw => {
        // 2. set article to each chapter
        eachLaw.chapter = chapterResult(eachLaw);
        eachLaw.chapter.map(eachChapter => {
            eachChapter.article = articleResult(eachChapter);
            // 3. set clause to each article
            eachChapter.article.map(eachArticle => {
                eachArticle.clause = clauseResult(eachArticle);
                eachArticle.clause.map(eachClause => {
                    // 4. set subparagraph to each clause
                    eachClause.subPara = subParaResult(eachClause);
                    eachClause.subPara.map(eachSubpara => {
                        // 5. set item to each subparagraph
                        eachSubpara.item = itemResult(eachSubpara);
                    });
                });
            });
        });
    });
    return nestedResult;
};
// lawResult(123, new Date(), "강아지");
lawResult(210085, new Date("2019-08-02 00:00:00"), "가사소송규칙");

