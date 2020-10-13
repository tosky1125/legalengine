const puppeteer = require('puppeteer');
const {
  CHAPTER,
  ARTICLE,
  LAW,
  CLAUSE,
  SUBPARAGRAPH,
  ITEM,
} = require('./models');




const spec = async () => {
  let data = await LAW.findOne({
    where: {
      id: k
    }
  })
  let url = `http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=${data.number}&chrClsCd=010202&urlMode=lsInfoP&ancYnChk=0&mobile=#0000`
  console.log(url)
  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
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
    let mok = ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하"];
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
            contexts: cont,
            date: chapDate,
          })
        } else {
          articleNum = arSlice(ele.id)
          article[articleNum] = {
            chapter_id: chapterNum,
            title: null,
            contexts: null,
            child: body[index + 1].children,
            yeon: null,
            hang: null,
            gyu: null,
            pan: null,
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
          contexts: cont,
          child: subText[index + 1].children,
        })
      }
    })

    for (let i in article) {

      let button = Array.from(article[i].child[0].children);
      let texts = Array.from(article[i].child[1].children);
      button.forEach(ele => {
        if (ele.lastChild.title.includes("조문")) article[i].pan = 1
        else if (ele.lastChild.firstChild.alt === "연혁") article[i].yeon = 1
        else if (ele.lastChild.title.includes("행정")) article[i].hang = 1
        else if (ele.lastChild.title.includes("규정")) article[i].gyu = 1
      })

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

        let checkState = cont.slice(0, 6);

        if (checkState.includes(".") && mok.indexOf(cont[4]) === -1) {
          subParNum++;
          subPara.push({
            chapter_id: article[i].chapter_id,
            article_id: i,
            clause_id: clauseNum,
            date: date,
            contexts: cont,
          })
        } else if (hang.indexOf(cont[2]) !== -1 || hang.indexOf(cont[3]) !== -1) {
          clauseNum++;
          clause.push({
            chapter_id: article[i].chapter_id,
            article_id: i,
            date: date,
            contexts: cont,
          })
        } else if (mok.indexOf(cont[4]) !== -1 && checkState.includes('.')) {
          itemNum++;
          item.push({
            chapter_id: article[i].chapter_id,
            article_id: i,
            clause_id: clauseNum,
            subPara_id: subParNum,
            date: date,
            contexts: cont,
          })
        } else {
          article[i].contexts = cont
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
        if (array[j].lastChild.className === 'sfon') {
          date = array[j].lastChild.textContent;
        }
        if (title) {

          artNum++;
          console.log(`드러가야할 ${chapter[i].chapter_number}:${artNum}`)
          article[`${chapter[i].chapter_number}:${artNum}`] = {
            chapter_id: chapter[i].chapter_number,
            title: title,
            contexts: null,
            date: artDate,
            yeon: null,
            hang: null,
            gyu: null,
            pan: null,
          }
        }
        cont = cont.replace(title, '');
        cont = cont.replace(artDate, '');
        let checkState = cont.slice(0, 6);
        let state = ''
        for (let i = 0; i < checkState.length; i++) {
          if (mok.indexOf(checkState[i]) !== -1 && checkState[i + 1] === '.') {
            state = '목';
            break;
          } else if (ho.indexOf(`${checkState[i]}${checkState[i+1]}`) !== -1) {
            state = '호';
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
            date: date,
            contexts: cont,
          })
        } else if (state === '항') {
          clauseNum++;
          clause.push({
            chapter_id: chapter[i].chapter_number,
            article_id: `${chapter[i].chapter_number}:${artNum}`,
            date: date,
            contexts: cont,
          })
        } else if (state === '목') {
          itemNum++;
          item.push({
            chapter_id: chapter[i].chapter_number,
            article_id: `${chapter[i].chapter_number}:${artNum}`,
            clause_id: clauseNum,
            subPara_id: subParNum,
            date: date,
            contexts: cont,
          })
        } else {
          clauseNum = null;
          subParNum = null;
          itemNum = null;
          if (`${chapter[i].chapter_number}:${artNum}` in article) {
            article[`${chapter[i].chapter_number}:${artNum}`].contexts = cont
          } else {
            artNum++
            article[`${chapter[i].chapter_number}:${artNum}`] = {
              chapter_id: chapter[i].chapter_number,
              title: title,
              contexts: cont,
              date: artDate,
              yeon: null,
              hang: null,
              gyu: null,
              pan: null,
            }
            clauseNum = null;
            subParNum = null;
            itemNum = null;
          }
        }

      }
      clauseNum = null;
      subParNum = null;
      itemNum = null;
    }

  })

}









let k = 1;
setInterval(spec, 1000, k);




// texts.forEach((ele, index) => {
//   let clauseNum, subParNum, itemNum = 0
//   let cont = ele.textContent;
//   let date = null;

//   if (index === 0) {
//     cont = cont.replace(article[i].title, "");
//   }
//   if (ele.lastChild.className === 'sfon') {
//     date = ele.lastChild.textContent

//   }
//   if (index === texts.length - 1 && ele.ChildElementCount === 1 && ele.lastChild.className === 'sfon') {
//     article[i].date = date;
//   }
// let checkState = cont.slice(0, 3);

// if (checkState.includes(".")) {
//   subParNum++;
//   subPara[subParNum] = {
//     chapter_id: chapterNum,
//     article_id: i,
//     clause_id: clauseNum,
//     date: date,
//     contexts: cont,
//   }
// } else if (hang.indexOf(cont[2]) !== -1) {
//   clauseNum++;
//   clause[clauseNum] = {
//     chapter_id: chapterNum,
//     article_id: i,
//     date: date,
//     contexts: cont,
//   }
// } else if (checkState.includes(')')) {
//   itemNum++;
//   item[itemNum] = {
//     chapter_id: chapterNum,
//     article_id: i,
//     clause_id: clauseNum,
//     subPara_id: subParNum,
//     date: date,
//     contexts: cont,
//   }
// } else {

//   // article[i].contexts = cont

// }