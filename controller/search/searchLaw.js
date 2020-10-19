const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require("../../models");
const {
  Op
} = require('sequelize');
const parse = require('date-fns/parse');
const totalData = require('../../searchNested');
module.exports = {
  get: async (req, res) => {
    const {
      lawName,
      enfDate,
      lawNum
    } = req.query;
    // 연관법령을렌더해줘야함
    console.log(req.body);
    res.send(await totalData(lawName, lawNum, new Date(String(enfDate))));

    // 전달사항: 검색어에 "법" 이 들어간 경우, 법을 제외한 나머지로 검색을 해 주는 건 
    // 클라이언트 팀과 대표님과의 이야기를 해 보고 결정해야 할 거 같아서 일단 주석처리 하였습니다 - 인섭, 10:47

    // if (name.indexOf('법') !== -1) {
    //   name = name.replace('법', '');
    // };
    // 

    // const law = await Law.findOne({
    //   where: {
    //     number: 73554,
    //   }
    // })
    // const chapter = await Chapter.findAll({
    //   where: {
    //     law_id: 619,
    //   }
    // })
    // const article = await Article.findAll({
    //   where: {
    //     law_id: 619,
    //   }
    // })
    // const clause = await Clause.findAll({
    //   where: {
    //     law_id: 619,
    //   }
    // })
    // const subPara = await Subparagraph.findAll({
    //   where: {
    //     law_id: 619
    //   }
    // })
    // const item = await Item.findAll({
    //   where: {
    //     law_id: 619
    //   }
    // })

    // res.send({
    //   law,
    //   chapter,
    //   article,
    //   clause,
    //   subPara,
    //   item,
    // })
  },

  post: async (req, res) => {
    let date = parse(req.body.date, 'yyyy-MM-dd', new Date());
    let keyword = req.body.searchWord;
    let searchResult = await Law.findAll({
      where: {
        name: {
          [Op.substring]: keyword,
        },
        enforcement_date: {
          [Op.lt]: date,
        },
      }, raw: true,
    });

    if (keyword.indexOf('법') !== -1) {
      let newkeyword = keyword.replace('법', '');
      let searchRelated = await Law.findAll({
        where: {
          name: {
            [Op.substring]: newkeyword
          },
          enforcement_date: {
            [Op.lt]: date,
          },
        }, raw : true,
      });
      searchRelated = searchRelated.filter(ele => ele.name !== keyword ? ele : false);
      searchResult = searchResult.concat(searchRelated);
    };
    res.send(searchResult);
  },
};
