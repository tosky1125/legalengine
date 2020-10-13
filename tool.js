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
  if(i === 75000){
	  i = 'banana'
  }
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
  console.log(url)
  let json = await convert.xml2json(res.data, {
    compact: true,
    spaces: 2
  });
  json = await JSON.parse(json);
  let lawContexts = json['법령']['기본정보']['법령명_한글']._cdata

  // Chapter

  if ('조문' in json['법령']) {
    let jo = json['법령']['조문']['조문단위'];
    let chapter = [];
    let article = [];
    let clause = [];
    let item = [];
    let chapterNum = 0;
    let articleNum = 0;
    let clauseNum = 0;
    if (Array.isArray(jo)) {
      jo.forEach((ele, index) => {
        if (ele._attributes['조문키'][6] === '0') {
          if ('조문내용' in ele) {
            chapter.push({
              chapterNum: Number(ele._attributes['조문키']),
              contexts: String(ele['조문내용']._cdata)
            });
            chapterNum = Number(ele._attributes['조문키'])
          }
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
                let innerTextHang = '항내용' in e ? e['항내용']._cdata : '';
                let contextsHang = '조문참고자료' in e ? innerTextHang + e['조문참고자료']._cdata : innerTextHang
                clause.push({
                  chapterNum: Number(chapterNum),
                  articleNum: Number(articleNum),
                  clauseNum: Number(index + 1),
                  contexts: String(contextsHang)
                })
                clauseNum = index;
                if ('호' in e) {
                  if (Array.isArray(e['호'])) {
                    e['호'].forEach((elem, i) => {
                      item.push({
                        chapterNum: Number(chapterNum),
                        articleNum: Number(articleNum),
                        clauseNum: Number(clauseNum),
                        itemNum: Number(i + 1),
                        contexts: String(elem['호내용']._cdata)
                      })
                    })
                  } else {
                    item.push({
                      chapterNum: Number(chapterNum),
                      articleNum: Number(articleNum),
                      clauseNum: Number(clauseNum),
                      itemNum: 1,
                      contexts: String(e['호']['호내용']._cdata)
                    })
                  }
                }
              })
            } else {
              console.log(ele['항'])
              let innerTextHang = '항내용' in ele['항'] ? ele['항']['항내용']._cdata : '';
              let contextsHang = '조문참고자료' in ele['항'] ? innerTextHang + ele['항']['조문참고자료']._cdata : innerTextHang
              clause.push({
                chapterNum: Number(chapterNum),
                articleNum: Number(articleNum),
                clauseNum: 1,
                contexts: String(contextsHang)
              })
              clauseNum = 1;
              if ('호' in ele['항']) {
                if (Array.isArray(ele['항']['호'])) {
                  ele['항']['호'].forEach((elem, i) => {
                    item.push({
                      chapterNum: Number(chapterNum),
                      articleNum: Number(articleNum),
                      clauseNum: Number(clauseNum),
                      itemNum: i,
                      contexts: String(elem['호내용']._cdata)
                    })
                  })
                } else {
                  item.push({
                    chapterNum: Number(chapterNum),
                    articleNum: Number(articleNum),
                    clauseNum: Number(clauseNum),
                    itemNum: i,
                    contexts: String(ele['항']['호']['호내용']._cdata)
                  })
                }
              }
            }
          }
        }
      })
    } else {
      chapter.push({
        chapterNum: Number(json['법령']['조문']['조문단위']._attributes['조문키']),
        contexts: String(json['법령']['조문']['조문단위']['조문내용']._cdata)
      });
    }
console.log(chapter);
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
    }
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
let i = 72680
//18707 28392 28844 28845 28846 28847
//72619 ~72679
//62875
//17957 57448
//56259 56268 56839 56840 56841
//27080
//9789
//16730 ~ 16745
//25962
//45328 45329 45330 45331 45332
//16567
//11131~11149
//11483~11489
//20028~20039
//20069
//20080~20084
//54861
//20029
//20131~20134
//42627
//44627
//42631 42632 42633
//52716~52720
//100199
//100716
//100717
//100850
//100994
//100995
//100996
//100997
//30693
//120832
//121524
//121525
//31716
//31717
//3338
//89744
//89745
//89746
//89748
//89749
//89750
//89751
//89752
//104942
//90808
//90809
//90810
//81502
//81503
//81505
//81506
//81507
//81508
//81509
//81510
//106574
//81510
//81511
//81512
//81513
//81514
//81515
//81516
//81517~81527
//33473
//106867
//106868
//106869
//106870~106874
//34109
//34111
//34113
//34121
//34142
//34162
//93694
//128523~128524
setInterval(deepSearch, 3000, i);
