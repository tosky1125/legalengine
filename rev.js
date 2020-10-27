const {
    Law,
    Revision
} = require('./models');

const {
    rmSpaceAndSymbols
} = require('./strHandlerSet');

const {
    Op
} = require('sequelize')

const findJustBefore = async (lawName, enfDate) => {
    // 연관법령 중 제일 마지막: 인자는 본문의 날짜, 법령의 이름
    const refinedName = rmSpaceAndSymbols(lawName);
    const dateObj = new Date(enfDate);
    const justBeforeLaw = await Law.findOne({
        attributes: ['name', 'enforcement_date'],
        where: {
            refined_name: refinedName,
            enforcement_date: {
                [Op.lt]: dateObj
            },
        },
        raw: true
    });
    console.log(justBeforeLaw);
    return justBeforeLaw;
};

// findJustBefore("10ㆍ27법난 피해자의 명예회복 등에 관한 법률 시행령", "2019-07-02 00:00:00");

const findByLawName = async (lawName) => {
    const refinedName = rmSpaceAndSymbols(lawName);
    const resByLawName = await Law.findAll({
        where: {
            refined_name: refinedName
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

// updateRevTable();