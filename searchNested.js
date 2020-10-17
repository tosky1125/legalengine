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

let findAllResult = async (lawName, lawNum, enfDate) => {
    console.log(lawName, lawNum, enfDate);
    let lawResult = await Law.findOne({
        where: {
            number: lawNum,
            name: lawName,
            enforcement_date: {
              [Op.lt]: enfDate
            }
        },
        raw: true
    });

    let nestedResult = await Chapter.findAll({
        where: {
            law_id: lawResult.law_id
        },
        include: [{
            model: Article,
            as: 'Article',
            raw: true,
            nest: true,
            include: [{
                model: Clause,
                as: 'Clause',
                nest: true,
                raw: true,
                include: [{
                    model: Subparagraph,
                    as: 'subPara',
                    raw: true,
                    nest: true,
                    include: [{
                        model: Item,
                        as: 'Item',
                        raw: true,
                        nest: true
                    }]
                }]
            }]
        }],
        nest: true,
        raw: true
    });
    lawResult.Chapter = nestedResult;
    return result = { Law: lawResult };
}

// findAllResult("가사소송규칙", 203441, new Date("2018-05-02 00:00:00"));
module.exports = findAllResult;

