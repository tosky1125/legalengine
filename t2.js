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

let findAllResult = async (lawName, lawNum, enfDate) => {
    console.log(lawName, lawNum, enfDate);
    let findAllResult = await Law.findOne({
        // include: {
        //     model: Chapter,
        //     as: 'chapter',
        //     include: {
        //         model: Article,
        //         as: 'article',
        //         include: {
        //             model: Clause,
        //             as: 'clause',
        //             include: {
        //                 model: Subparagraph,
        //                 as: 'subPara',
        //                 include: {
        //                     model: Item,
        //                     as: 'item',
        //                 }
        //             }
        //         }
        //     }
        // },
        where: {
            number: lawNum,
            name: lawName,
            enforcement_date: enfDate
        },
        raw: true
    });
    console.log(findAllResult)
}

findAllResult("가사소송규칙", 203441, new Date("2019-08-02 00:00:00"));

