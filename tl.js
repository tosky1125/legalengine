var webPage = require('webpage');
var page = webPage.create();
page.open('http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=82716&chrClsCd=010202&urlMode=lsInfoP&efYd=20080101&ancYnChk=0&mobile=#0000', function (status) {
  setTimeout(() => {
    var content = page.evaluate(() => document.querySelector('.pgroup').textContent);
    console.log(content);
  },500)
});
