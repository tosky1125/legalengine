const {
  Law,
} = require('../models/index');
let puppeteer = require('puppeteer');


module.exports = {
  spec: async () => {
    let url = `http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=206223&chrClsCd=010202&urlMode=lsInfoP&ancYnChk=0&mobile=#0000`;
    let browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    let page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    let result = await page.evaluate(() => {
      let body = Array.from(document.querySelector('#conScroll').children);
      let subText = Array.from(document.querySelector('#arDivArea').children);
      let chapter = [],
        article = {},
        clause = [],
        subPara = [],
        item = [],
        chapterNum = null,
        articleNum = null,
        clauseNum = null,
        subParNum = null,
        itemNum = null;
      let state = (str) => {

        for (let i = 0; i < str.length; i++) {
          if (ho.indexOf(`${str[i]}${str[i+1]}`) !== -1) {
            hhjm = '호';
            break;
          } else if (mok.indexOf(`${str[i]}${str[i+1]}`) !== -1) {
            hhjm = '목';
            break;
          } else if (hang.indexOf(str[i]) !== -1) {
            hhjm = '항';
            break;
          } else if (str[i] + 1 !== ' ') {
            hhjm = '조';
          }
        };
      };
      let chapSlice = (str) => {
        let tmp = str.slice(2);
        for (let i = 0; i < tmp.length; i += 1) {
          if (tmp[i] === ':') {
            return `${tmp.slice(0, i)}:0`;
          }
        }
      };
      let hhjm = '';
      let arSlice = (str) => {
        let tmp = str.slice(1);
        let sliceResult;
        for (let i = 0; i < tmp.length; i += 1) {
          if (tmp[i] === ':') {
            sliceResult = `${tmp.slice(0, i)}:0`;
          };
        };
        if (tmp[tmp.length] - 1 !== '0') {
          return tmp;
        } else {
          return sliceResult;
        }
      };
      body.forEach((ele, index) => {
        if (ele.nodeName === 'A' && ele.id === ele.name) {
          if (ele.id.includes('P')) {
            chapterNum = chapSlice(ele.id);
            let chapDate = null;
            if (body[index + 1].children[0].lastChild.className === 'sfon') {
              chapDate = body[index + 1].children[0].lastChild.textContent;
            };
            let cont = body[index + 1].innerText.slice(8).replace(chapDate, '');
            chapter.push({
              chapter_number: chapterNum,
              context: cont,
              date: chapDate,
            });
          } else {
            articleNum = arSlice(ele.id)
            article[articleNum] = {
              chapter_id: chapterNum,
              article_number: articleNum,
              title: null,
              context: null,
              child: body[index + 1].children,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            }
          }
        };
      });
      return {
        chapter,
        article
      };
    })
    await browser.close();
    return result;
  },
};