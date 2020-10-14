const puppeteer = require('puppeteer');
const {
  Chapter,
  Article,
  Law,
  Clause,
  Subparagraph,
  Item,
} = require('./models');




const spec = async () => {
  let data = await Law.findOne({
    where: {
      id: k
    }
  })
  let url = `http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=${data.number}&chrClsCd=010202&urlMode=lsInfoP&ancYnChk=0&mobile=#0000`
  
  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0'
  });

  let result = await page.evaluate(() => {
    let body = Array.from(document.querySelector('#conScroll').children)
    let subText = Array.from(document.querySelector('#arDivArea').children)
    let chapter = [];
    let article = {};
    let clause = [];
    let subPara = [];
    let item = [];
    let ho = ["0.", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12.", "13.", "14.", "15.", "16.", "17.", "18.", "19.", "20.", "21.", "22.", "23.", "24.", "25.", "26.", "27.", "28.", "29.", "30.", "31.", "32.", "33.", "34.", "35.", "36.", "37.", "38.", "39.", "40.", "41.", "42.", "43.", "44.", "45.", "46.", "47.", "48.", "49.", "50."];
    let hang = ["⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳", "㉑", "㉒", "㉓", "㉔", "㉕", "㉖", "㉗", "㉘", "㉙", "㉚", "㉛", "㉜", "㉝", "㉞", "㉟", "㊱", "㊲", "㊳", "㊴", "㊵", "㊶", "㊷", "㊸", "㊹", "㊺", "㊻", "㊼", "㊽", "㊾", "㊿"]
    let mok = ["가.", "나.", "다.", "라.", "마.", "바.", "사.", "아.", "자.", "차.", "카.", "타.", "파.", "하.", '1)', '2)', '3)', '4)', '5)', '6)', '7)', '8)', '9)', '0)'];
    let chapterNum = null,
      articleNum = null,
      clauseNum = null,
      subParNum = null,
      itemNum = null;
    let chapSlice = (str) => {
      let tmp = str.slice(2)
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === ':') {
          return `${tmp.slice(0, i)}:0`
        }
      }
    }
    let arSlice = (str) => {
      let tmp = str.slice(1)
      let result;

      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === ':') {
          result = tmp.slice(0, i) + `:0`
        }
      }
      if (tmp[tmp.length] - 1 !== '0') {
        return tmp;
      } else {
        return result;
      }

    }

    let spaceDel = (str) => {
      let result;
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
          result = str.slice(i)
          return result
        }
      }
    }

    body.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        if (ele.id.includes('P')) {
          chapterNum = chapSlice(ele.id);
          let chapDate = null;
          if (body[index + 1].children[0].lastChild.className === 'sfon') {
            chapDate = body[index + 1].children[0].lastChild.textContent
          }
          let cont = body[index + 1].innerText.slice(8).replace(chapDate, '')
          chapter.push({
            chapter_number: chapterNum,
            context: cont,
            date: chapDate,
          })
        } else {
          articleNum = arSlice(ele.id)
          article[articleNum] = {
            chapter_id: chapterNum,
            title: null,
            context: null,
            child: body[index + 1].children,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          }
        }
      }
    })
    let length = chapter.length;

    subText.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        chapterNum = ele.id.slice(1);
        let date = null;
        if (subText[index + 1].children[0].children[2].lastChild.className === 'sfon') {
          date = subText[index + 1].children[0].children[2].lastChild.textContent
        };
        let cont = subText[index + 1].children[0].children[2].textContent.replace(date, '')
        chapter.push({
          chapter_number: chapterNum,
          date: date,
          context: cont,
          child: subText[index + 1].children,
        })
      }
    })

    for (let i in article) {

      let button = Array.from(article[i].child[0].children);
      let texts = null;
      if (article[i].child[1]) texts = Array.from(article[i].child[1].children);
      else texts = article[i].child[0].textContent;
      button.forEach(ele => {
        if (ele.lastChild.title.includes("조문")) article[i].flag_pan = 1
        else if (ele.lastChild.firstChild.alt === "연혁") article[i].flag_yeon = 1
        else if (ele.lastChild.title.includes("행정")) article[i].flag_hang = 1
        else if (ele.lastChild.title.includes("규정")) article[i].flag_gyu = 1
      })
      if (typeof texts === 'string') {
        article[i].context = texts
      } else {
        for (let j = 0; j < texts.length; j++) {

          let cont = texts[j].textContent
          
          let date = null;
          if (texts[j].className === 'pty1_de2') {
            article[i].date = texts[j].textContent
            continue;
          }
          if (j === 0) {
            article[i].title = texts[j].children[1].textContent
          }
          if (texts[j].lastChild.className === 'sfon') {
            date = texts[j].lastChild.textContent;
          }
          cont = cont.replace(article[i].title, '');
          cont = cont.replace(date, '')

          let checkState = cont.slice(0, 20);
          let state = '';
          for (let i = 0; i < checkState.length; i++) {
            if (ho.indexOf(`${checkState[i]}${checkState[i+1]}`) !== -1) {
              state = '호';
              break;
            }else if (mok.indexOf(`${checkState[i]}${checkState[i+1]}`) !== -1) {
              state = '목';
              break;
            } else if (hang.indexOf(checkState[i]) !== -1) {
              state = '항';
              break;
            }
          }
          console.log(checkState, state)
          if (state === '호') {
            subParNum++;
            subPara.push({
              chapter_id: article[i].chapter_id,
              article_id: i,
              clause_id: clauseNum,
              date: date,
              context: cont,
            })
          } else if (state === '항') {
            clauseNum++;
            clause.push({
              chapter_id: article[i].chapter_id,
              article_id: i,
              date: date,
              context: cont,
            })
          } else if (state === '목') {
            itemNum++;
            item.push({
              chapter_id: article[i].chapter_id,
              article_id: i,
              clause_id: clauseNum,
              subPara_id: subParNum,
              date: date,
              context: cont,
            })
          } else {
            article[i].context = cont
          }
        }
      }
      clauseNum = null;
      subParNum = null;
      itemNum = null;
    }
    for (let i = length; i < chapter.length; i++) {
      let array = Array.from(chapter[i].child)
      let artDate = null;
      let artNum = 0;
      if (array.length === 3) {
        array[2] = Array.from(array[2].children)
        array = array.flat();
      }
      for (let j = 1; j < array.length; j++) {
        cont = array[j].textContent;
        let title = null;
        let date = null;
        if (array[j].children.length > 0 && array[j].children[0].className === 'bl') {
          title = array[j].children[0].textContent;
        }
        if (array[j].lastChild && array[j].lastChild.className === 'sfon') {
          date = array[j].lastChild.textContent;
        }
        if (title) {
          artNum++;
          article[`${chapter[i].chapter_number}:${artNum}`] = {
            chapter_id: chapter[i].chapter_number,
            title: title,
            context: null,
            date: artDate,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          }
        }
        cont = cont.replace(title, '');
        cont = cont.replace(artDate, '');
        let checkState = cont.slice(0, 20);
        let state = ''
        for (let i = 0; i < checkState.length; i++) {
          if (ho.indexOf(`${checkState[i]}${checkState[i+1]}`) !== -1) {
            state = '호';
            break;
          } else if (mok.indexOf(`${checkState[i]}${checkState[i+1]}`) !== -1) {
            state = '목';
            break;
          } else if (hang.indexOf(checkState[i]) !== -1) {
            state = '항';
            break;
          } else state = '조'
        }

        if (state === '호') {
          subParNum++;
          subPara.push({
            chapter_id: chapter[i].chapter_number,
            article_id: `${chapter[i].chapter_number}:${artNum}`,
            clause_id: clauseNum,
            sub_number: subParNum,
            date: date,
            context: cont,
          })
        } else if (state === '항') {
          clauseNum++;
          clause.push({
            chapter_id: chapter[i].chapter_number,
            article_id: `${chapter[i].chapter_number}:${artNum}`,
            clause_number: clauseNum,
            date: date,
            context: cont,
          })
        } else if (state === '목') {
          itemNum++;
          item.push({
            chapter_id: chapter[i].chapter_number,
            article_id: `${chapter[i].chapter_number}:${artNum}`,
            clause_id: clauseNum,
            sub_id: subParNum,
            item_number: itemNum,
            date: date,
            context: cont,
          })
        } else {
          clauseNum = null;
          subParNum = null;
          itemNum = null;
          if (`${chapter[i].chapter_number}:${artNum}` in article) {
            article[`${chapter[i].chapter_number}:${artNum}`].context = cont
          } else {
            artNum++
            article[`${chapter[i].chapter_number}:${artNum}`] = {
              chapter_id: chapter[i].chapter_number,
              title: title,
              context: cont,
              date: artDate,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            }
          }
        }
      }
      clauseNum = null;
      subParNum = null;
      itemNum = null;
    }
    return {
      chapter,
      article,
      clause,
      subPara,
      item
    }
  })

  let {
    chapter,
    article,
    clause,
    subPara,
    item
  } = result

  await chapter.forEach(ele => {
    let {
      chapter_number,
      date,
      context
    } = ele
    Chapter.create({
      law_id: k,
      chapter_number,
      date,
      context: context
    })
  })

  for (let i in article) {
    let {
      chapter_id,
      title,
      date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    } = article[i];
    await Article.create({
      law_id: k,
      chapter_id,
      article_title: title,
      article_number: i,
      date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    })
  }

  await clause.forEach(ele => {
    let {
      chapter_id,
      article_id,
      clause_number,
      date,
      context
    } = ele
    Clause.create({
      law_id: k,
      chapter_id,
      article_id,
      clause_number,
      date,
      context,
    })
  })

  await subPara.forEach(ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_number,
      date,
      context
    } = ele
    Subparagraph.create({
      law_id: k,
      chapter_id,
      article_id,
      clause_id,
      sub_number,
      date,
      context,
    })
  })

  await item.forEach(ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_number,
      date,
      context
    } = ele

    Item.create({
      law_id: k,
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_number,
      date,
      context
    })
  })

  await k++
}


let k = 514;
setInterval(spec, 5000, k);