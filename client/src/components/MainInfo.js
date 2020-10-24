import React from 'react';
import { format } from 'date-fns';

class MainInfo extends React.Component {
  render() {
    let law = JSON.parse(localStorage.Law);
    console.log(law);

    let { Chapter } = law;

    const keyword = JSON.parse(localStorage.searchWord);
    const searchDate = JSON.parse(localStorage.searchDate);
    // '구조'
    const regex = new RegExp(keyword, 'g');
    const lawRegex = new RegExp(/\「(.*?)\」/);

    const artUrlfragment = (strFrom) => {
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
      const selectedLaw = lawRegex.test(context)
        ? context.match(lawRegex)[1]
        : null;
      console.log(selectedLaw);
      if (selectedLaw) {
        const inTagLaw = lawRegex.test(context)
          ? context.match(lawRegex)[0]
          : null;
        context = context.replace(
          lawRegex,
          `<span onclick=fetch('http://13.125.112.243')>${inTagLaw}</span>`
        );
      }
      console.log(context);
      return context;
    };

    Chapter = Chapter.map((chapEle, chapEleIndex) => (
      <div key={chapEleIndex}>
        <span className='viewpage-chapter-titles'>{chapEle.context}</span>
        <span className='date'>&nbsp;{chapEle.date}</span>
        {chapEle.Article &&
          chapEle.Article.map((artEle, artEleIndex) => (
            <div className='viewpage-contents' key={artEleIndex}>
              <a name={artUrlfragment(artEle.article_id)}></a>
              <div
                className='viewpage-article-title'
                name={artUrlfragment(artEle.article_id)}
              >
                {artEle.article_title}&nbsp;&nbsp;
              </div>
              <span className='viewpage-buttons'>
                {artEle.flag_pan && (
                  <button className='viewpage-buttons-pan'>
                    <a
                      href={`http://www.law.go.kr/LSW/joStmdInfoP.do?lsiSeq=200188&joNo=${
                        joSlicer(artEle.article_id)[0]
                      }&joBrNo=${joSlicer(artEle.article_id)[1]}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      판
                    </a>
                  </button>
                )}
                {artEle.flag_yeon && (
                  <button className='viewpage-buttons-yeon'>
                    {/* <a 
                    href='http://www.law.go.kr/LSW/lsJoHstProc.do?lsid={추후삽입}&lsiSeq={Law.number}&joNo=0002&joBrNo=00&lType=0002'
                    target='_blank'
                  >                   
                  </a> */}
                    {/* javascript:fJoHstShow(this,'000695','216111','58955861','010202'); */}
                    연
                  </button>
                )}
                {artEle.flag_hang && (
                  <button className='viewpage-buttons-hang'>
                    {/* <a
                    href='http://www.law.go.kr/LSW/conAdmrulByLsPop.do?&lsiSeq={Law.number}&joNo={조(0001)}&joBrNo={조 하위}&datClsCd=010102&dguBun=DEG'
                    target='_blank'
                  ></a> */}
                    행
                  </button>
                )}
                {artEle.flag_gyu && (
                  <button className='viewpage-buttons-gyu'>
                    {/* <a
                    href='http://www.law.go.kr/LSW/lsCtlInfListR.do?lsiSeq={law.number}&lsId={추후삽입}&joNo=0001&joBrNo=00'
                    target='_blank'
                  ></a> */}
                    규
                  </button>
                )}
              </span>
              <div className='viewpage-article-context'>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      artEle.context &&
                      relatedLaw(artEle.context).replace(
                        regex,
                        `<span class='keyword-highlight'>${keyword}</span>`
                      ),
                  }}
                ></span>
                <span className='date'>{artEle.cont_date}</span>
              </div>
              {artEle.Clause &&
                artEle.Clause.map((claEle, claEleIndex) => {
                  return (
                    <div key={claEleIndex}>
                      <div className='viewpage-clause-context'>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              claEle.context &&
                              claEle.context.replace(
                                regex,
                                `<span class='keyword-highlight'>${keyword}</span>`
                              ),
                          }}
                        ></span>
                        <span className='date'>{claEle.date}</span>
                      </div>

                      {claEle.subPara &&
                        claEle.subPara.map((subEle, subEleIndex) => {
                          return (
                            <div key={subEleIndex}>
                              <div className='viewpage-sub-context'>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      subEle.context &&
                                      subEle.context.replace(
                                        regex,
                                        `<span class='keyword-highlight'>${keyword}</span>`
                                      ),
                                  }}
                                ></span>
                              </div>
                              <span className='date'>{subEle.date}</span>
                              {subEle.Item &&
                                subEle.Item.map((itEle, itEleIndex) => {
                                  if (itEle.context.includes('http')) {
                                    return (
                                      <img
                                        key={itEleIndex}
                                        className='img'
                                        src={itEle.context}
                                        alt={itEle.context}
                                      ></img>
                                    );
                                  } else {
                                    return (
                                      <div key={itEleIndex}>
                                        <div className='viewpage-item-context'>
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                itEle.context &&
                                                itEle.context.replace(
                                                  regex,
                                                  `<span class='keyword-highlight'>${keyword}</span>`
                                                ),
                                            }}
                                          ></span>
                                          <span className='date'>
                                            {itEle.date}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              <div className='date'>{artEle.date}</div>
            </div>
          ))}
      </div>
    ));
    return (
      <table>
        <div className='viewpage-maininfo-container'>
          <div className='viewpage-law-head'>
            <h1>{law.name}</h1>
            <p className='viewpage-law-head-info'>
              [시행 {format(new Date(law.enforcement_date), 'yyyy.MM.dd.')}] [
              {law.type}&nbsp;
              {law.number}호,&nbsp;
              {format(new Date(law.promulgation_date), 'yyyy.MM.dd.')}
              ,&nbsp;
              {law.amendment_status}]
            </p>
          </div>
          {Chapter}
        </div>
      </table>
    );
  }
}

export default MainInfo;
