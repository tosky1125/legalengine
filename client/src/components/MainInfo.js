import React from 'react';
import { format } from 'date-fns';
import './MainInfo.css';
import pdf from '../images/pdf.png';
import hwp from '../images/hwp.png';

class MainInfo extends React.Component {
  render() {
    let law = JSON.parse(localStorage.Law);
    console.log(law);

    let { Chapter } = law;
    let { File } = law;

    const keyword = JSON.parse(localStorage.searchWord);
    const searchDate = JSON.parse(localStorage.searchDate);

    const regex = new RegExp(keyword, 'g');
    const lawRegex = new RegExp(/\「(.*?)\」/);

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
      const selectedLaw = lawRegex.test(context)
        ? context.match(lawRegex)[1]
        : null;
      // console.log(selectedLaw);
      if (selectedLaw) {
        const inTagLaw = lawRegex.test(context)
          ? context.match(lawRegex)[0]
          : null;
        context = context.replace(
          lawRegex,
          `<span onclick=fetch('http://13.125.112.243')>${inTagLaw}</span>`
        );
      }
      // console.log(context);
      return context;
    };
    Chapter = Chapter.map((chapEle, chapEleIndex) => (
      <div key={chapEleIndex}>
        <a name={addendaUrlfragment(chapEle.chapter_id)}></a>
        <span className='maininfo-chapter-titles'>{chapEle.context}</span>
        <span className='date'>&nbsp;{chapEle.date}</span>
        {chapEle.Article &&
          chapEle.Article.map((artEle, artEleIndex) => (
            <div className='maininfo-contents' key={artEleIndex}>
              <a name={articleUrlfragment(artEle.article_id)}></a>
              {artEle.article_title && (
                <div className='maininfo-article-title'>
                  {artEle.article_title}&nbsp;&nbsp;
                </div>
              )}
              <span className='maininfo-buttons'>
                {artEle.flag_pan && (
                  <button className='maininfo-buttons-pan'>
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
                  <button className='maininfo-buttons-yeon'>
                    {/* <a 
                    href='http://www.law.go.kr/LSW/lsJoHstProc.do?lsid={뭐야이거}&lsiSeq={Law.number}&joNo={조문번호}&joBrNo={조문번호'의'}&lType={뭐야이거}'
                    target='_blank'
                  >                   
                  </a> */}
                    {/* javascript:fJoHstShow(this,'000695','216111','58955861','010202'); */}
                    연
                  </button>
                )}
                {artEle.flag_hang && (
                  <button className='maininfo-buttons-hang'>
                    {/* <a
                    href='http://www.law.go.kr/LSW/conAdmrulByLsPop.do?&lsiSeq={Law.number}&joNo={조(0001)}&joBrNo={조 하위}&datClsCd=010102&dguBun=DEG'
                    target='_blank'
                  ></a> */}
                    행
                  </button>
                )}
                {artEle.flag_gyu && (
                  <button className='maininfo-buttons-gyu'>
                    {/* <a
                    href='http://www.law.go.kr/LSW/lsCtlInfListR.do?lsiSeq={law.number}&lsId={추후삽입}&joNo=0001&joBrNo=00'
                    target='_blank'
                  ></a> */}
                    규
                  </button>
                )}
              </span>
              <div className='maininfo-article-context'>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      artEle.context &&
                      relatedLaw(artEle.context).replace(
                        regex,
                        `<span className='keyword-highlight'>${keyword}</span>`
                      ),
                  }}
                ></span>
                <span className='date'>{artEle.cont_date}</span>
              </div>
              {artEle.Clause &&
                artEle.Clause.map((claEle, claEleIndex) => {
                  return (
                    <div key={claEleIndex}>
                      <div className='maininfo-clause-context'>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              claEle.context &&
                              claEle.context
                                .replace(
                                  regex,
                                  `<span className='keyword-highlight'>${keyword}</span>`
                                )
                                .replace(/\s+/, ''),
                          }}
                        ></span>
                        <span className='date'>{claEle.date}</span>
                      </div>
                      {claEle.subPara &&
                        claEle.subPara.map((subEle, subEleIndex) => {
                          return (
                            <div key={subEleIndex}>
                              <div className='maininfo-sub-context'>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      subEle.context &&
                                      subEle.context.replace(
                                        regex,
                                        `<span className='keyword-highlight'>${keyword}</span>`
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
                                        <div className='maininfo-item-context'>
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                itEle.context &&
                                                itEle.context.replace(
                                                  regex,
                                                  `<span className='keyword-highlight'>${keyword}</span>`
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

    File = File
      ? File.map((ele) => (
          <div className='file'>
            <a name='file'></a>
            <span>{ele.context}</span>
            <span>{ele.date}</span>
            {ele.hwp && (
              <a href={ele.hwp} alt='한글'>
                <img className='file-img' src={hwp} alt='hwp' />
              </a>
            )}
            {ele.pdf && (
              <a href={ele.pdf} alt='PDF'>
                <img className='file-img' src={pdf} alt='pdf' />
              </a>
            )}
          </div>
        ))
      : null;

    return (
      <div>
        <div className='maininfo-page-header'></div>
        <div className='maininfo-page-footer'></div>
        <table>
          <thead>
            <tr>
              <td>
                <div className='maininfo-page-header-space'></div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='maininfo-container'>
                  <div className='maininfo-law-head'>
                    <h1>{law.name}</h1>
                    <p className='maininfo-law-head-info'>
                      [시행{' '}
                      {format(new Date(law.enforcement_date), 'yyyy.MM.dd.')}] [
                      {law.type}&nbsp;
                      {law.number}호,&nbsp;
                      {format(new Date(law.promulgation_date), 'yyyy.MM.dd.')}
                      ,&nbsp;
                      {law.amendment_status}]
                    </p>
                  </div>
                  {Chapter}
                  <br />
                  <br />
                  {File}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className='mainifo-page-footer-space'></div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class='maininfo-page-header'></div>
        <div class='maininfo-page-footer'></div>
      </div>
    );
  }
}

export default MainInfo;
