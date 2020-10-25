// connect duplicates which they are basically same but they has another name

const {
    Law,
    Revision
} = require('./models');

const {
    rmSpaceAndSymbols, extractKeyword, parseDate
} = require('./strHandlerSet');

const {
    Op
} = require('sequelize');

const add = require('date-fns/add');

// const findLaws = async (lawName) => {
//     const refinedName = rmSpaceAndSymbols(lawName);
//     const lawResult = await Law.findAll({
//         where: {
//             refined_name: refinedName
//         },
//         order: [['enforcement_date', 'DESC']],
//         raw: true
//     });
//     console.log(lawResult);
// };

// 법이 적용되는 시간

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
        group: ['name'],
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

totalData("10ㆍ27법난 피해자의 명예회복 등에 관한 법률", "2019-03-25 00:00:00", "206034");