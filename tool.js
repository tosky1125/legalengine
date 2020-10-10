const axios = require('axios');
const convert = require('xml-js');
const {
  LAW,
  ARTICLE,
  CHAPTER,
  CLAUSE,
  ITEM
} = require('./models')

let deepSearch = async () => {
  let data = await LAW.findOne({
    where: {
      id: i
    }
  })
  let {
    number,
    enforcement_date
  } = data
  let searchDate = dateParse(enforcement_date)
  let url = `http://www.law.go.kr/DRF/lawService.do?OC=tosky0514&target=eflaw&MST=${number}&efYd=${searchDate}&type=XML`
  let res = await axios.get(url)

  let json = await convert.xml2json(res.data, {
    compact: true,
    spaces: 2
  });
  json = await JSON.parse(json);
  let lawContexts = json['법령']['기본정보']['법령명_한글']._cdata

  // Chapter
  let jo = json['법령']['조문']['조문단위'];
  let chapter = [];
  let article = [];
  let clause = [];
  let item = [];
  let chapterNum;
  let articleNum;
  let clauseNum;
  jo.forEach(ele => {
    if (ele._attributes['조문키'][6] === '0') {
      console.log(ele._attributes['조문키'])
      chapter.push({
        chapterNum: Number(ele._attributes['조문키']),
        contexts: String(ele['조문내용']._cdata)
      });
      chapterNum = Number(ele._attributes['조문키'])
    } else {
      let contexts = '조문참고자료' in ele ? ele['조문내용']._cdata + ele['조문참고자료']._cdata : ele['조문내용']._cdata
      article.push({
        articleNum: Number(ele._attributes['조문키']),
        contexts: String(contexts),
        chapterNum: Number(chapterNum)
      });
      articleNum = ele._attributes['조문키'];
      if ('항' in ele) {
        if (Array.isArray(ele['항'])) {
          ele['항'].forEach((e, index) => {
            let contextsHang = '조문참고자료' in e ? e['항내용']._cdata + e['조문참고자료']._cdata : e['항내용']._cdata
            clause.push({
              chapterNum: Number(chapterNum),
              articleNum: Number(articleNum),
              clauseNum: Number(index + 1),
              contexts: String(contextsHang)
            })

            clauseNum = index;
            if ('호' in e) {
              e['호'].forEach((elem, i) => {
                item.push({
                  chapterNum: Number(chapterNum),
                  articleNum: Number(articleNum),
                  clauseNum: Number(clauseNum),
                  itemNum: Number(i + 1),
                  contexts: String(elem['호내용'])
                })
              })
            }
          })
        } else if ('호' in ele['항']) {
          ele['항']['호'].forEach((elem, i) => {
            item.push({
              chapterNum: Number(chapterNum),
              articleNum: Number(articleNum),
              clauseNum: Number(clauseNum),
              itemNum: i,
              contexts: String(elem['호내용'])
            })
          })
        }
      }
    }
  })
  await LAW.update({
    contexts: lawContexts
  }, {
    where: {
      id: i
    }
  })


  if (chapter.length !== 0) {
    await chapter.forEach(ele => {
      
      let {
        chapterNum,
        contexts
      } = ele
      CHAPTER.create({
        law_id: number,
        chapter_number: chapterNum,
        date: enforcement_date,
        contexts: contexts
      })
    })
  }
  if (article.length !== 0) {
    article.forEach(ele => {
      ARTICLE.create({
        law_id: number,
        chapter_id: ele.chapterNum,
        article_number: ele.articleNum,
        date: enforcement_date,
        contexts: ele.contexts,
        flag_pan: 1,
      })
    })
  }
  if (clause.length !== 0) {
    await clause.forEach(ele => {
      CLAUSE.create({
        law_id: number,
        chapter_id: ele.chapterNum,
        article_id: ele.articleNum,
        clause_number: ele.clauseNum,
        date: enforcement_date,
        contexts: ele.contexts,
      })
    })
  }
  if (item.length !== 0) {
    await item.forEach(ele => {
      ITEM.create({
        law_id: number,
        chapter_id: ele.chapterNum,
        article_id: ele.articleNum,
        clause_id: ele.clauseNum,
        item_number: ele.itemNum,
        date: enforcement_date,
        contexts: ele.contexts
      })
    })
    await i++
  }
}
const pad = (str) => {
  return str.length === 1 ? str.padStart(2, '0') : str
}
let dateParse = (data) => {
  var year = String(data.getFullYear())
  var month = String(data.getMonth() + 1)
  var date = String(data.getDate())
  month = pad(month);
  date = pad(date);
  var fullDate = `${year}${month}${date}`
  return fullDate
}
let i = 1;
setInterval(deepSearch, 3000, i);