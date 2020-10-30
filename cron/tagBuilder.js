const totalData = require('../searchNested');
const { Law } = require('../models');
const {
  format
} = require('date-fns');

// db 에서 모든 해당하는 law_id 의 값을 nested 형태로 가져온 뒤에, client 사이드의  innerHTML 로 넣어줄 수 있도록 완성형 tag 로 작성.
const htmlMaker = async (createdLaw) => {
  const { name, enforcement_date, number } = createdLaw;

  const law = await totalData(name, new Date(String(enforcement_date)), number);
  let {
    Chapter, File,
  } = law.Law;
  
  // const keyword = JSON.parse(localStorage.searchWord);
  // const regex = new RegExp(keyword, 'g');
  const lawRegex = new RegExp(/ 「(.*?)\」/, 'g');

  const addendaUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const addendaUrl = '0'.repeat(1) + str;
    return addendaUrl;
  };

  const articleUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const artUrl = '0'.repeat(3) + str;
    return artUrl;
  };

  const joSlicer = (strFrom) => {
    const str = String(strFrom);
    if (str.includes(':')) {
      const splited = str.split(':');
      const joRaw = splited[0];
      const joBrRaw = splited[1];
      const joNo = '0'.repeat(4 - joRaw.length) + joRaw;
      const joBrNo = '0'.repeat(2 - joBrRaw.length) + joBrRaw;
      return [joNo, joBrNo];
    } else {
      return ['0', '0'];
    }
  };

  const relatedLaw = (context) => {
    const inTagLaw = lawRegex.test(context) ? context.match(lawRegex)[0] : null;
    if(inTagLaw){
      context = context.replace(lawRegex, `<a href='/law/${inTagLaw.replace(/[^가-힣^0-9]/g, "")}?enfDate=${format(new Date(law.Law.enforcement_date), 'yyyy-MM-dd')}' target='_blank'>${inTagLaw}</a>`);
    }
    return context;
  };
  console.log(Chapter);
  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    `<div key=${chapEleIndex}>
      <a name=${addendaUrlfragment(chapEle.chapter_id)}></a>
      <span class='maininfo-chapter-titles'>${chapEle.context}</span>
      <span class='date'>${chapEle.date}</span>
      ${chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          `<div class='maininfo-contents' key=${artEleIndex}>
            <a name=${articleUrlfragment(artEle.article_id)}></a>
            ${artEle.article_title && (
              `<div class='maininfo-article-title'>
                ${artEle.article_title}
              </div>`
            )}
            <span class='maininfo-buttons'>
              ${artEle.flag_pan && (
                `<button class='maininfo-buttons-pan'>
                  <a href='http://www.law.go.kr/LSW/joStmdInfoP.do?lsiSeq=${number}&joNo=${joSlicer(artEle.article_id)[0]}&joBrNo=${joSlicer(artEle.article_id)[1]}' target='_blank' rel='noopener noreferrer'>판</a></button>`
              )}
              ${artEle.flag_yeon && `<button class='maininfo-buttons-yeon'>연</button>` }
              ${artEle.flag_hang && `<button class='maininfo-buttons-hang'>행</button>` }
              ${artEle.flag_gyu && `<button class='maininfo-buttons-gyu'>규</button>` }
            </span>
            <div class='maininfo-article-context'>
              <span>${artEle.context ? relatedLaw(artEle.context) : ''}</span>
              <span class='date'>${artEle.cont_date}</span>
            </div>
            ${artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => {
                return (
                  `<div key=${claEleIndex}>
                    <div class='maininfo-clause-context'>
                      <span>${claEle.context ? relatedLaw(claEle.context) : ''}</span>
                      <span class='date'>${claEle.date}</span>
                    </div>
                    ${claEle.subPara && claEle.subPara.map((subEle, subEleIndex) => {
                        return (
                          `<div key=${subEleIndex}>
                            <div class='maininfo-sub-context'>
                              <span>${subEle.context ? relatedLaw(subEle.context) : ''}</span>
                            </div>
                            <span class='date'>${subEle.date}</span>
                            ${subEle.Item &&
                              subEle.Item.map((itEle, itEleIndex) => {
                                if (itEle.context.includes('http')) {
                                  return (
                                    `<img
                                      key=${itEleIndex}
                                      class='img'
                                      src=${itEle.context}
                                      alt=${itEle.context}
                                    ></img>`
                                  )
                                } else {
                                  return (
                                    `<div key=${itEleIndex}>
                                      <div class='maininfo-item-context'>
                                        <span>${itEle.context ? relatedLaw(itEle.context) : null}</span>
                                        <span class='date'>
                                          ${itEle.date}
                                        </span>
                                      </div>
                                    </div>`
                                  )
                                }
                              })}
                          </div>`
                        )
                      })}
                  </div>`
                );
              })}
            <div class='date'>${artEle.date}</div>
          </div>`
        ))} 
    </div>`
  ));

  File = File
    ? File.map((ele) => (
      `<div class='file'>
          <a name='file'></a>
          <span>${ele.context}</span>
          <span>${ele.date}</span>
          <div class='file-button'>${ele.hwp && `<button class='file-button-hwp'><a href=${ele.hwp} alt='한글'>한글</button>`}
          ${ele.pdf && (
        `<button class='file-button-pdf'><a href=${ele.pdf} alt='PDF'/>PDF</button>`)}</div></div>`
    ))
    : null;
  const head = ` <div>
        <div class='maininfo-page-header-space'></div>
          <div class='maininfo-wrapper'>
          <div class='maininfo-container'>
            <div class='maininfo-law-head'>
              <h1>${findLaw.name}</h1>
              <p class='maininfo-law-head-info'>
                [시행  ${format(new Date(findLaw.enforcement_date), 'yyyy.MM.dd.')}] [
                ${findLaw.type}&nbsp;
                ${number}호,&nbsp;
                ${format(new Date(findLaw.promulgation_date), 'yyyy.MM.dd.')} ${findLaw.amendment_status}]</p>
            </div>`;
  const bottom =  `</div><tfoot><div class='mainifo-page-footer-space'></div></tfoot><div class='maininfo-page-header'></div><div class='maininfo-page-footer'></div></div></div>`;

  Chapter = Chapter.join('').replace(/null/g, '').replace(/>,</g,'><');
  File = File.join('').replace(/null/g, '').replace(/>,</g,'><');
  const html = `${head}${Chapter}<br /><br /><div className='file-container'>
  <input type='checkbox' id='file-contTitle' />
  <label htmlFor='contTitle'>서식</label>
  <div> 
    <a name='file'
      className='articlelink-article-title'
    >
    </a>
  </div>
  </div>${File}${bottom}`;
  await Law.update({ context : html }, { where : { law_id : createdLaw.law_id }});
};

module.exports = htmlMaker;

