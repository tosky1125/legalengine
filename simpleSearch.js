const { 
    Law,
  } = require('./models');
  
  const {
    Op
  } = require('sequelize');

  const {
    rmSpaceAndSymbols, extractKeyword, parseDate
  } = require('./strHandlerSet');


const simpleTotalData = async (name, eDate, number) => {
    let simpleTotalDataResult = {};

    const extractedKeyword = extractKeyword(name);
    const refinedKeyword = rmSpaceAndSymbols(extractedKeyword);
    const parsedDate = parseDate(eDate);

    const relatedLaws = await Law.findAll({
        attributes: ['name', 'refined_name', 'enforcement_date', 'number'],
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

    const mainLaws = await Law.findOne({
        where: {
            number: number,
        },
        raw: true
    });

    simpleTotalDataResult.Related =  relatedLaws;
    simpleTotalDataResult.Law = mainLaws;

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
    return findLawNAttrs;
};

module.exports = { simpleTotalData, findLawForInline };



