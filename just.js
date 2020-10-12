const puppeteer = require('puppeteer');
const {
  CHAPTER,
  ARTICLE,
  LAW,
} = require('./models');

let hang = ['①','②','③','④','⑤','⑥','⑦']
let ho = ['1.','2.','3.','4.','5.','6.','7.','8.','9.']
const spec = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  let page = await browser.newPage();
  let chapter = [];
  let article = [];

  await page.goto('http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=105416&chrClsCd=010202&urlMode=lsInfoP&efYd=20101201&ancYnChk=0&mobile=#', {
    waitUntil: 'networkidle2'
  });

  let result = await page.evaluate(() => {
    let body = Array.from(document.querySelector('#conScroll').children)
    let chapter = [];
    let article = [];
    let chapterId, articleId, clauseId, subParId, itemId = 0;
    body.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        ele.id.includes('P') ? (chapter.push({
          ele: body[index + 1],
          id: ele.id
        }), chapterId = ele.id) : (article.push({
          ele: body[index + 1],
          chapterId: chapterId,
          articleId: ele.id
        }), articleId = ele.id)
      }
    })
    
  })
  console.log(result);
}



spec();