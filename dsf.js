const axios = require("axios");
const cheerio = require("cheerio");
const convert = require('xml-js');



axios.get("http://www.law.go.kr/DRF/lawService.do?OC=tosky0514&target=eflaw&ID=10719&type=HTML")
  .then(res => {
    
    const $ = cheerio.load(res.data);
    let a = $('.searchForm').text()

    return a
      
    }).then(console.log)
    // .headline-list ul").children("li.section02");
  

// axios.get(`http://www.law.go.kr/DRF/lawService.do?OC=tosky0514&target=eflaw&ID=10719&type=HTML`)
// .then(response => {
//     // let data = convert.xml2json(response.data, {
//     //   compact: true,
//     //   spaces: 4
//     // });
//     // data = JSON.parse(data);
//     // data = data.LawSearch.law
//     console.log(response.data)
//   });