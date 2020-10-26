const totalData = require('./searchNested');
const {
  format
} = require('date-fns');
const lawName = '2015세계물포럼 지원 특별법';
const enfDate = '2021-10-21';
const lawNum = 137096;
const htmlMaker = async () => {
  const law = await totalData(lawName, new Date(String(enfDate)), lawNum);
  let {
    Chapter, File,
  } = law.Law;
  // const keyword = JSON.parse(localStorage.searchWord);
  // const regex = new RegExp(keyword, 'g');
  const lawRegex = new RegExp(/\「(.*?)\」/, 'g');
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
    const selectedLaw = lawRegex.test(context) ? context.match(lawRegex)[1] : null;
    // console.log(selectedLaw);
    if (selectedLaw) {
      const inTagLaw = lawRegex.test(context) ? context.match(lawRegex)[0] : null;
      context = context.replace(lawRegex, `<a href='/law/${law.Law.name}?ruleID=${law.Law.number}&date=${format(new Date(law.Law.enforcement_date), 'yyyyMMdd')} target='_blank'>${inTagLaw}</a>`);
    }
    // console.log(context);
    return context;
  };
  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    `<div key=${chapEleIndex}>
      <a name=${addendaUrlfragment(chapEle.chapter_id)}></a>
      <span className='maininfo-chapter-titles'>${chapEle.context}</span>
      <span className='date'>&nbsp;${chapEle.date}</span>
      ${chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          `<div className='maininfo-contents' key=${artEleIndex}>
            <a name=${articleUrlfragment(artEle.article_id)}></a>
            ${artEle.article_title && (
              `<div className='maininfo-article-title'>
                ${artEle.article_title}&nbsp;&nbsp;
              </div>`
            )}
            <span className='maininfo-buttons'>
              ${artEle.flag_pan && (
                `<button className='maininfo-buttons-pan'>
                  <a href='http://www.law.go.kr/LSW/joStmdInfoP.do?lsiSeq=200188&joNo=${joSlicer(artEle.article_id)[0]}&joBrNo=${joSlicer(artEle.article_id)[1]}' target='_blank' rel='noopener noreferrer'>판</a></button>`
              )}
              ${artEle.flag_yeon && `<button className='maininfo-buttons-yeon'>연</button>` }
              ${artEle.flag_hang && `<button className='maininfo-buttons-hang'>행</button>` }
              ${artEle.flag_gyu && `<button className='maininfo-buttons-gyu'>규</button>` }
            </span>
            <div className='maininfo-article-context'>
              <span>${ artEle.context && relatedLaw(artEle.context)}</span>
              <span className='date'>${artEle.cont_date}</span>
            </div>
            ${artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => {
                return (
                  `<div key=${claEleIndex}>
                    <div className='maininfo-clause-context'>
                      <span>${claEle.context && relatedLaw(claEle.context)}</span>
                      <span className='date'>${claEle.date}</span>
                    </div>
                    ${claEle.subPara && claEle.subPara.map((subEle, subEleIndex) => {
                        return (
                          `<div key=${subEleIndex}>
                            <div className='maininfo-sub-context'>
                              <span>${subEle.context && relatedLaw(subEle.context)}</span>
                            </div>
                            <span className='date'>${subEle.date}</span>
                            ${subEle.Item &&
                              subEle.Item.map((itEle, itEleIndex) => {
                                if (itEle.context.includes('http')) {
                                  return (
                                    `<img
                                      key=${itEleIndex}
                                      className='img'
                                      src=${itEle.context}
                                      alt=${itEle.context}
                                    ></img>`
                                  );
                                } else {
                                  return (
                                    `<div key=${itEleIndex}>
                                      <div className='maininfo-item-context'>
                                        <span>${itEle.context &&relatedLaw(itEle.context)}</span>
                                        <span className='date'>
                                          ${itEle.date}
                                        </span>
                                      </div>
                                    </div>`
                                  );
                                }
                              })}
                          </div>`
                        );
                      })}
                  </div>`
                );
              })}
            <div className='date'>${artEle.date}</div>
          </div>`
        ))} 
    </div>`
  ));
  File = File
    ? File.map((ele) => (
      `<div className='file'>
          <a name='file'></a>
          <span>${ele.context}</span>
          <span>${ele.date}</span>
          ${ele.hwp && `<a href=${ele.hwp} alt='한글'><img className='file-img' src=${hwp} alt='hwp' /></a>`}
          ${ele.pdf && (
        `<a href=${ele.pdf} alt='PDF'>
              <img className='file-img' src=${pdf} alt='pdf' />
            </a>`)}
        </div>`
    ))
    : null;
  Chapter = Chapter.map(ele => ele.replace(/null/g, ''));
  return Chapter;
};

const wrapper = async () => {
    const res = await htmlMaker(); 
    res.map((eachRes, index) => {
        console.log(`----------------------this is ${index}'s element of res----------------------`);
        console.log(eachRes);
        console.log(`----------------------this is ${index}'s element of res----------------------`);
    });
};

wrapper();
