const axios = require("axios");
const request = require('request')
const cheerio = require("cheerio");
let url = "http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=82716&chrClsCd=010202&urlMode=lsInfoP&efYd=20080101&ancYnChk=0&mobile=#0000"


var interval = 10 * 1000; // 10 seconds;

setTimeout(function () {
  request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body, {
        ignoreWhitespace: true
      });
      var name = [];
      var address = [];
      var website = [];
      console.log($('.viewwrap').html());
    }
  }, interval);
})