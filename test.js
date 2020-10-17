const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require("./models");
const {
  Op
} = require('sequelize');
const parse = require('date-fns/parse');
let result = async (req, res) => {
  // let date = parse(req.body.date, 'yyyy-MM-dd', new Date());
  let date = '20200706'
  let keyword = '가사소송법';

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
    searchResult = searchResult.concat(searchRelated);;
    
  };
  console.log(searchResult);
}

result();

// result ={
//   chapter:[ {chapter_id: , context, date : , article [vla bla , clause [ sadfjsl sub par [ ] ] ] } 2 3 4]
// }