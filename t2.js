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

let totalResult = async (number, eDate, name) => {
    let nestedResult = {};

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
    nestedResult.law = lawResult;
    // console.log(lawResult)

    let chapResult = await Chapter.findAll({
        include: [
            {
                model: Law,
                where: {
                    id: Sequelize.col('Law.law_id')
                }
            }
        ],
        where: {
            law_id: lawResult.law_id
        },
        raw: true
    });
    // console.log(chapResult);

    chapResult.map(async(eachChap) => {
        let articleResult = await Article.findAll({
            include: [
                {
                    model: Chapter,
                    where: {
                        id: Sequelize.col('Chapter.chapter_id')
                    }
                }
            ],
            where: {
                chapter_id: eachChap.id
            },
            raw: true
        });
        if (articleResult) {
            eachChap.article = articleResult;
        } else {
            eachChap.article = 'there is no nested article';
        }
    });
    nestedResult.chapter = chapResult;
    console.log(nestedResult);
    return nestedResult;
}

totalResult(88753, new Date("2008-09-09T00:00:00.000Z"), "10·27법난 피해자의 명예회복 등에 관한 법률 시행령");