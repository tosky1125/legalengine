const {
    Law,
    Revision
} = require('./models');

const findByLawName = async (lawName) => {
    const resByLawName = await Law.findAll({
        where: {
            name: lawName,
        },
        order: [['enforcement_date', 'ASC']],
        raw: true,
    });
    return resByLawName;
};

const groupByLawName = async () => {
    const totalLawNameObj = await Law.findAll({
        group: ['name'],
        attributes: ['name'],
        raw: true
    });
    const totalLawNameArr = Array.from(totalLawNameObj, arg => arg.name);
    return totalLawNameArr;
};

const crawlRevision = async () => {
    
}

const createRevRecord = async (lawDatas) => {
    for (let i = 0; i < lawDatas.length; i++) {
        if (i + 1 === lawDatas.length) {
            return;
        } else {
            await Revision.create({
                old_law_id: lawDatas[i].law_id,
                new_law_id: lawDatas[i+1].law_id,
                statement: null,
                reason: null
            });
        };
    };
};

const updateRevTable = async () => {
    const lawNameArr = await groupByLawName();
    lawNameArr.map(async(eachLawName) => {
        const lawDataGroupbyName = await findByLawName(eachLawName);
        createRevRecord(lawDataGroupbyName);
    });
};

updateRevTable();