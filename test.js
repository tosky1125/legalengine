// const puppeteer = require('puppeteer');
// const {
//   CHAPTER,
//   ARTICLE,
//   LAW,
// } = require('./models');
// const spec = async () => {
//   let browser = await puppeteer.launch({
//     headless: true,
//     args: ['--no-sandbox']
//   });
//   let page = await browser.newPage();
//   let chapter = [];
//   let article = [];
//   await page.goto('http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=105416&chrClsCd=010202&urlMode=lsInfoP&efYd=20101201&ancYnChk=0&mobile=#', {
//     waitUntil: 'networkidle2'
//   });
//   let result = await page.evaluate(() => {
//     let array = Array.from(document.querySelectorAll('.pgroup'));
//     let happy = array.map(ele => ele.textContent);
//     return happy;
//   })
//   console.log(result);
// }
// spec();

let type_list = [
  '법률',             '대통령령',           '행정안전부령',
  '총리령',           '안전행정부령',       '교통부령',
  '재무부령',         '각령',               '문화체육부령',
  '문화체육관광부령', '대법원규칙',         '경제기획원령',
  '농림부령',         '농수산부령',         '법무부령',
  '동력자원부령',     '환경부령',           '보건복지부령',
  '보건사회부령',     '여성가족부령',       '여성부령',
  '보건복지가족부령', '국가재건최고회의령', '농림축산식품부령',
  '농림수산식품부령', '농림수산부령',       '중앙선거관리위원회규칙',
  '보건부령',         '교육부령',           '문교부령',
  '교육인적자원부령', '교육과학기술부령',   '국무원령',
  '국토교통부령',     '재정경제부령',       '감사원규칙',
  '국토해양부령',     '건설교통부령',       '건설부령',
  '기획재정부령',     '통일부령',           '해양수산부령',
  '미래창조과학부령', '행정자치부령',       '국방부령',
  '노동부령',         '고용노동부령',       '내무부령',
  '문화관광부령',     '기타',               '체육부령',
  '외무부령',         '대통령긴급명령',     '상공부령',
  '지식경제부령',     '산업통상자원부령',   '헌법재판소규칙'
];

let min_list = [
  '문화체육관광부',
  '소방청',
  '교육부',
  '국방부',
  '인사혁신처',
  '중소벤처기업부',
  '법무부',
  '환경부',
  '해양수산부',
  '국토교통부',
  '여성가족부',
  '행정안전부',
  '국무조정실,해양수산부',
  '과학기술정보통신부',
  '국가보훈처',
  '국방부,법무부',
  '통일부',
  '대법원',
  '공정거래위원회',
  '산업통상자원부',
  '기타',
  '국가재건최고회의',
  '농림축산식품부',
  '중앙선거관리위원회',
  '교육부,행정안전부',
  '해당부처',
  '보건복지부',
  '금융위원회,기획재정부',
  '금융위원회',
  '금융위원회,행정안전부',
  '감사원',
  '보건복지부,질병관리청',
  '기획재정부',
  '개인정보보호위원회',
  '국방부,행정안전부',
  '식품의약품안전처',
  '고용노동부',
  '국토교통부,산업통상자원부',
  '질병관리청',
  '대검찰청,법무부',
  '법무부,행정안전부',
  '고용노동부,여성가족부',
  '경찰청,해양경찰청',
  '경찰청',
  '통계청',
  '해양경찰청',
  '헌법재판소'
]

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

let put_type = async () => {
  type_list.map(async (arg) => {
    Law_Type.create({
      type: arg
    })
  })
}

let put_min = async () => {
  min_list.map(async (arg) => {
    Ministry.create({
      name: arg
    })
  })
}

// put_type();
// put_min();

let test_association = async (keyword, dateNotParsed) => {
  let date = parse(dateNotParsed, 'yyyy-MM-dd', new Date());
  let searchResult = await Law.findAll({
    include: [
      {
        model: Ministry,
        where: {
          id: Sequelize.col('Law.ministry')
        },
        attributes: ['name']
      },
      // {
      //   model: Law_Type,
      //   where: {
      //     id: Sequelize.col('Law.type')
      //   },
      //   attributes: ['type']
      // }
    ],
    where: {
      name: {
        [Op.substring]: keyword
      },
      enforcement_date: {
        [Op.lt]: date
      },
    },
    raw: true
  });
  console.log(searchResult);
  console.log({
    law_id: searchResult[0].id,
    number: searchResult[0].name,
    promulgation_date: searchResult[0].promulgation_date,
    promulgation_number: searchResult[0].promulgation_number,
    enforcement_date: searchResult[0].enforcement_date,
    amendment_status: searchResult[0].amendment_status,
    context: searchResult[0].context,
    ministry_name: searchResult[0]['Ministry.name'],
    law_type: searchResult[0]['Law_Type.type']
  });
};

// test_association("가정", "2020-10-14");

let test_create = async () => {
  let result = await Law.create({
    law_id: '1234567891011',
    number: '12345',
    name: 'test law',
    promulgation_date: new Date(),
    type: '감사원규칙',
    promulgation_number: '123',
    enforcement_date: new Date(),
    amendment_status: 'test law',
    ministry: '감사원',
    context: 'test law context'
  });
  console.log(result);
}

// test_create();

let test = async () => {
  let lawAndCol = await Law.findAll({
    include: [
      {
        model: Chapter
      },
      {
        model: Article
      }
    ],
    raw: true,
  });
  console.log(lawAndCol);
};

test();