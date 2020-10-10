const puppeteer = require('puppeteer');
const {
  CHAPTER,
  ARTICLE,
  LAW,
} = require('./models');

const spec = async (url) => {

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
  let lawContexts = title + subTitle;

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

  jang = jang.slice(0,jangText.length)
  let chapID;
  jang.forEach((ele, index) => {
    if (index <= jangText.length) {
      console.log(index)
      ele.includes('P') ? (chapter.push({
          id: ele.slice(2),
          text: jangText[index]['text']
        }),
        chapID = ele.slice(2)
      ) : article.push({
        id: ele.slice(1),
        text: jangText[index]['text'],
        pan: 1,
        yeon: jangText[index]['yeon'],
        chapter_number: chapID
      })
    }
  })

  return {
    chapter,
    article,
    lawContexts,
  }
}
let i = 1;

let crawl = async () => {
  let data = await LAW.findOne({
    where: {
      id: i
    }
  })
  let {
    number,
    contexts,
    enforcement_date
  } = data

  let {
    chapter,
    article,
    lawContexts
  } = await spec(contexts);

  if (chapter.length !== 0) {
    await chapter.forEach(ele => {
      CHAPTER.create({
        law_id: number,
        chapter_number: ele.id,
        date: enforcement_date,
        contexts: ele.text
      })
    })
  }
  if (article.length !== 0) {
    await article.forEach(ele => {

      ARTICLE.create({
        law_id: number,
        chapter_id: ele.chapter_number,
        article_number: ele.id,
        date: enforcement_date,
        contexts: ele.text,
        flag_pan: ele.pan,
        flag_yeon: ele.yeon,
      })
    })
  }
  await LAW.update({
    contexts: lawContexts
  }, {
    where: {
      id: i
    }
  })
  await i++;
}

setInterval(crawl, 7000, i);
