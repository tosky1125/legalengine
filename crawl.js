const puppeteer = require('puppeteer');
const {
  CHAPTER, ARTICLE
} = require('./models');

const spec = async () => {

  let url = 'http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=82716&chrClsCd=010202&urlMode=lsInfoP&efYd=20080101&ancYnChk=0&mobile=#0000';

  let browser = await puppeteer.launch({
   headless: true,
   args: ['--no-sandbox']
});
  let page = await browser.newPage();
  let chapter = [];
  let article = [];

  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  let title = await page.evaluate(() => document.querySelector('#conTop').textContent);
  let subTitle = await page.evaluate(() => document.querySelector('.cont_subtit').textContent);
  let jang = await page.evaluate(() => {
    let array = Array.from(document.querySelectorAll('a[name*="J"]'));
    let text = array.map(ele => ele.id)
    return text;
  })
  let jangText = await page.evaluate(() => {
    let array = Array.from(document.querySelectorAll('.pgroup'));
    let text = array.map(ele => {
      let check = ele.lastChild.previousSibling
      let yeon = check !== null && check.childElementCount === 2 ? 1 : 0;
      return {
        text: ele.textContent,
        pan: 1,
        yeon: yeon
      }
    })
    return text;
  })

  jang.forEach((ele, index) => {
    ele.includes('P') ? chapter.push({
      id: ele,
      text: jangText[index]['text']
    }) : article.push({
      id: ele,
      text: jangText[index]['text'],
      pan: 1,
      yeon: jangText[index]['yeon']
    })
  })
   console.log(article)
}


spec()


