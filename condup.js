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

const findLawRefNameList = async () => {
    const lawSortedByRefined = await Law.findAll({
        attributes: ['refined_name'],
        group: ['refined_name'],
        raw: true
    });
    const lawRefNameArr = Array.from(lawSortedByRefined, arg => arg.refined_name);
    return lawRefNameArr;
};

const updateRevTable = async (refNameList) => {
    refNameList.map(async (refName) => {
        const lawByName = await Law.findAll({
            where: {
                refined_name: refName
            },
            order: [['enforcement_date', 'ASC']],
            raw: true
        });
        lawByName.map((eachLaw, index) => {
            if (index + 1 === lawByName.length) {
                return;
            } else {
                Revision.create({
                    old_law_id: eachLaw.law_id,
                    new_law_id: lawByName[index + 1].law_id,
                    statement: String(eachLaw.enforcement_date),
                    reason: String(eachLaw.enforcement_date)
                });
            }
        });
    });
};

const startUpateRevTable = async () => {
    const lawRefNameArr = await findLawRefNameList();
    updateRevTable(lawRefNameArr);
};

startUpateRevTable();


