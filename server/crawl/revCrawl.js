const puppeteer = require('puppeteer');
const {
  Revision
} = require('../models/index');
const axios = require('axios');
const {
  format
} = require('date-fns');

const getRev = async () => {
  // 법령 목록에서 아이디 k 값을 찾는다.
  const data = await Law.findOne({
    where: {
      law_id: k,
    },
    raw: true,
  });
  // 만약 첫 번째 실행결과에서 값을 못 찾을 경우 

  const url = `https://www.law.go.kr/lsInfoP.do?lsiSeq=${data.number}&lsId=&efYd=${format(new Date(data.enforcement_date), 'yyyyMMdd')}&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=lsRvsDocInfoR&ancYnChk=0`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  const result = await page.evaluate(() => {
    const paragraph = document.querySelector('#rvsBot').nextElementSibling.nextElementSibling;
    const context = paragraph.textContent;

  });
  return result;
}
