let puppeteer = require('puppeteer');
let Window = require('window')
let spec = async () => {  
  const window = new Window();
  let url = `http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=220681&chrClsCd=010202&urlMode=lsInfoP&ancYnChk=0&mobile=#0000`;

  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });


  let result = await page.evaluate(() => {
    let a = document.querySelector('#conScroll').outerHTML;
    return a;
  })
  await browser.close();
  let div = window.document.createElement('div');
  div.innnerHTML=result;
  console.log(div);
}
spec();
