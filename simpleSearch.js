// 사용할 model 들을 불러와줍니다
const { 
    Law,
    File,
    Chapter,
    Article,
    Clause,
    Subparagraph,
    Item,
    sequelize
} = require('./models');

// Operator 를 사용하기 위해서 sequelize 로부터 불러옵니다
const {
    Op
} = require('sequelize');

// helper 함수들을 불러옵니다 
const {
    rmSpaceAndSymbols, extractKeyword, parseDate
} = require('./strHandlerSet');

// 법의 이름과 시행일을 통해 Law Table 로부터 조건에 맞는 법을 한 개 검색합니다 
const lawResult = async (name, eDate) => {
    const refinedName = rmSpaceAndSymbols(name);
    const parsedDate = parseDate(eDate);
    const lawResult = await Law.findOne({
      where: {
          enforcement_date: {
              [Op.lte]: parsedDate
          },
          refined_name: refinedName
      },
      raw: true
  });
  return lawResult;
};

// File Table 로부터 lawData Object 의 law_id 를 통해 해당 법령에 연관된 첨부파일들을 모두 찾아줍니다 
const fileResult = async (lawData) => {
    const fileResult = await File.findAll({
        where: {
            law_id: lawData.law_id
        },
        raw: true,
    });
    return fileResult;
}

// Chapter Talbe 로부터 lawData Object 의 law_id 와 같은 law_id 를 가지고 있는 Chapter 를 모두 찾습니다
const chapterResult = async (lawData) => {
    const chapterResult = await Chapter.findAll({
      raw: true,
      where: {
          law_id: lawData.law_id
      },
      attributes: ['id', 'chapter_id', 'date', 'context'],
  });
  return chapterResult;
};

// Article Talbe 로부터 chapterData Object 의 id 와 같은 chapter_id 를 가지고 있는 Article 를 모두 찾습니다
const articleResult = async (chapData) => {
    const articleResult = await Article.findAll({
      raw:true,
      where: {
          chapter_id: chapData.id
      },
      attributes: ['id', 'article_id', 'article_title', 'date'],
  });
  return articleResult;
};

// Clauses Talbe 로부터 articleData Object 의 id 와 같은 article_id 를 가지고 있는 Clause 를 모두 찾습니다
const clauseResult = async (artData) => {
    const clauseResult = await Clause.findAll({
      raw: true,
      where: {
          article_id: artData.id
      }
  });
  return clauseResult;
};

// Subparagraphs Talbe 로부터 clauseData Object 의 id 와 같은 clause_id 를 가지고 있는 Subparagraph 를 모두 찾습니다
const subParaResult = async (clauseData) => {
    const subParaResult = await Subparagraph.findAll({
      raw: true,
      where: {
          clause_id: clauseData.id
      }
  });
  return subParaResult;
};

// Items Talbe 로부터 subParagraphData Object 의 id 와 같은 sub_id 를 가지고 있는 Item 를 모두 찾습니다
const itemResult = async (subParaData) => {
    const itemResult = await Item.findAll({
      raw: true,
      where: {
          sub_id: subParaData.id
      }
  });
  return itemResult;
};

// 법의 이름과 시행일(enforcement_date) 을 이용하여
// - 연관법령
// - 특정 법령의 상세정보
//  - 특정 법률이 가지고 있는 첨부파일
// - URL Fragment 를 구현하기 위해 필요한 하위 항목들의 간단한 정보
// 들을 전부 찾습니다 

const simpleTotalData = async (name, eDate) => {
    // 담을 빈 객체를 선언해줍니다, 재할당이 있기 때문에 let으로 선언하였습니다
    let simpleTotalDataResult = {};

    // 법의 이름으로부터 연관법령을 조회하기 위한 키워드를 추출합니다
    const extractedKeyword = extractKeyword(name);
    console.log(extractKeyword);

    // String 으로 들어온 날짜를 DB 에서 비교할 수 있도록 Date 객체로 parsing 해 줍니다
    const parsedDate = parseDate(eDate);
    console.log(parsedDate);

    // const refinedKeyword = extractKeyword(searchWord);

    // const relatedLaws = await Law.findAll({
    //     // type 중에서 '헌법', '법률', '대통령령', '총리령', '대법원규칙' 이 나온다면 해당 순수대로 정렬해줍니다
    //     order: [
    //       [sequelize.fn('FIELD', sequelize.col('Law.type'), '대법원규칙', '총리령', '대통령령', '법률', '헌법'), "DESC"],
    //       ['enforcement_date', 'DESC']
    //     ],
    //     // SELECT * 이 아닌, 그 중에서도 필요한 요소들만을 추출합니다
    //     attributes: [
    //       'number', 'name', 'promulgation_date', 'enforcement_date', 'type', 'amendment_status', 'ministry'
    //     ],
    //     // enforcement_date 가 parsedDate 이전이고, refinedKeyword 를 포함한 (substring) refined_name 을 가진 Law Record 들을 찾습니다
    //     where: {
    //       enforcement_date: {
    //         [Op.lte]: parsedDate,
    //       },
    //       refined_name: {
    //         [Op.substring]: refinedKeyword,
    //       },
    //     },
    //     // 그리고 refined_name 으로 Grouping 을 해 줍니다 s
    //     group: 'refined_name',
    //     raw: true
    //   });

    // 연관법령을 찾아주고, relatedLaws 에 할당해줍니다 
    const relatedLaws = await Law.findAll({
        // type 중에서 '헌법', '법률', '대통령령', '총리령', '대법원규칙' 이 나온다면 해당 순수대로 정렬해줍니다
        order: [
            [sequelize.fn('FIELD', sequelize.col('Law.type'), '대법원규칙', '총리령', '대통령령', '법률', '헌법'), "DESC"],
            ['enforcement_date', 'DESC']
        ],
        // SELECT * 이 아닌, 그 중에서도 필요한 요소들만을 추출합니다
        attributes: [
            'name', 'refined_name', 'promulgation_date', 'enforcement_date', 'number', 'amendment_status', 'type'
        ],
        // enforcement_date 가 parsedDate 이전이고, refinedKeyword 를 포함한 (substring) refined_name 을 가진 Law Record 들을 찾습니다
        where: {
            enforcement_date: {
                [Op.lte]: parsedDate
            },
            refined_name: {
                [Op.substring]: extractedKeyword
            },
        },
        // 그리고 refined_name 으로 Grouping 을 해 줍니다 
        group: 'refined_name',
        raw: true
    });

    // return 할 Object 인 simpleTotalDataResult 에 Related 라는 key 값에 relatedLaws 를 할당해줍니다
    simpleTotalDataResult.Related =  relatedLaws;

    // 이제 위에 만들어준 Helper 함수들을 이용하여 Law 안에 Fragment Render 에 필요한 값들만을 Nested 하게 할당한다
    simpleTotalDataResult.Law = await lawResult(name, eDate);
    simpleTotalDataResult.Law.Chapter = await chapterResult(simpleTotalDataResult.Law);
    for (eachChapter of simpleTotalDataResult.Law.Chapter) {
        eachChapter.Article = await articleResult(eachChapter);
    };

    // 마지막으로, 해당 Law 에 포함된 File 들을 찾아준 뒤, File 이라는 key 값에 할당해준다
    simpleTotalDataResult.Law.File = await fileResult(simpleTotalDataResult.Law);

    // 해당 값들을 담은 simpleTotalDataResult 를 return 해준다 
    console.log(simpleTotalDataResult);
    return simpleTotalDataResult;
};

module.exports = { simpleTotalData };