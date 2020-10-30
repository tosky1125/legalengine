import React from 'react';
import { format } from 'date-fns';
import './MainInfo.css';
import pdf from '../images/pdf.png';
import hwp from '../images/hwp.png';

class PrevMainInfo extends React.Component {
  render() {
    let law = JSON.parse(localStorage.Law);
    console.log(law);

    let { Chapter } = law;
    let { File } = law;
    console.log(law.refined_name);
    const keyword = JSON.parse(localStorage.searchWord);
    // const searchDate = JSON.parse(localStorage.searchDate);

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

    Chapter = Chapter.map(
      (chapEle, chapEleIndex) =>
        `<div key=${chapEleIndex}>
      <a name=${addendaUrlfragment(chapEle.chapter_id)}></a>
      <span class='maininfo-chapter-titles'>${chapEle.context}</span>
      <span class='date'>${chapEle.date}</span>
      ${
        chapEle.Article &&
        chapEle.Article.map(
          (artEle, artEleIndex) =>
            `<div>
            <div class='maininfo-contents' key=${artEleIndex}>
            <a name=${articleUrlfragment(artEle.article_id)}></a>
            ${
              artEle.article_title &&
              `<div class='maininfo-article-title'>
                ${artEle.article_title}
              </div>`
            }
            <span class='maininfo-buttons'>
              ${
                artEle.flag_pan &&
                `<button class='maininfo-buttons-pan'>
                  <a href='http://www.law.go.kr/LSW/joStmdInfoP.do?lsiSeq=${number}&joNo=${
                  joSlicer(artEle.article_id)[0]
                }&joBrNo=${
                  joSlicer(artEle.article_id)[1]
                }' target='_blank' rel='noopener noreferrer'>판</a></button>`
              }
              ${
                artEle.flag_yeon &&
                `<button class='maininfo-buttons-yeon'>연</button>`
              }
              ${
                artEle.flag_hang &&
                `<button class='maininfo-buttons-hang'>행</button>`
              }
              ${
                artEle.flag_gyu &&
                `<button class='maininfo-buttons-gyu'>규</button>`
              }
            </span>      
            ${
              artEle.context &&
              `<div class='maininfo-article-context'>
              <span>${relatedLaw(artEle.context)}
              ${
                artEle.cont_date &&
                `<span class='date'>${artEle.cont_date}</span>`
              }
            </div>`
            }          
            ${
              artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => {
                return `<div key=${claEleIndex}>
                ${
                  claEle.context &&
                  `<div class='maininfo-clause-context'>
                      <span>${relatedLaw(claEle.context)}</span>
                      ${
                        claEle.date &&
                        `<span class='date'>${claEle.date}</span>`
                      }
                    </div>`
                }
                    ${
                      claEle.subPara &&
                      claEle.subPara.map((subEle, subEleIndex) => {
                        return `<div key=${subEleIndex}>
                        ${
                          subEle.context &&
                          `<div class='maininfo-sub-context'>
                              <span>${relatedLaw(subEle.context)}
                              </span>
                              ${
                                subEle.date &&
                                `<span class='date'>${subEle.date}</span>`
                              }
                              </div>`
                        }
                            ${
                              subEle.Item &&
                              subEle.Item.map((itEle, itEleIndex) => {
                                if (itEle.context.includes('http')) {
                                  return `<img
                                      key=${itEleIndex}
                                      class='img'
                                      src=${itEle.context}
                                      alt=${itEle.context}
                                    ></img>`;
                                } else {
                                  return `<div key=${itEleIndex}>
                                  ${
                                    itEle.context &&
                                    `<div class='maininfo-item-context'>
                                        <span>${relatedLaw(
                                          itEle.context
                                        )}</span>
                                        ${
                                          itEle.date &&
                                          `<span class='date'>
                                          ${itEle.date}
                                        </span>`
                                        }
                                      </div>`
                                  }
                                    </div>`;
                                }
                              })
                            }
                          </div>`;
                      })
                    }
                  </div>`;
              })
            }
            <div class='date'>${artEle.date}</div>
          </div>
          </div>`
        )
      } 
    </div>`
    );

    File = File
      ? File.map(
          (ele) =>
            `<div class='file'>
          <a name='file'></a>
          <span>${ele.context}</span>
          <span>${ele.date}</span>
          <div class='file-button'>${
            ele.hwp &&
            `<button class='file-button-hwp'><a href=${ele.hwp} alt='한글'>한글</button>`
          }
          ${
            ele.pdf &&
            `<button class='file-button-pdf'><a href=${ele.pdf} alt='PDF'/>PDF</button>`
          }</div></div>`
        )
      : null;
    const head = ` <div>
        <div class='maininfo-page-header-space'></div>
          <div class='maininfo-wrapper'>
          <div class='maininfo-container'>
            <div class='maininfo-law-head'>
              <h1>${findLaw.name}</h1>
              <p class='maininfo-law-head-info'>
                [시행  ${format(
                  new Date(findLaw.enforcement_date),
                  'yyyy.MM.dd.'
                )}] [
                ${findLaw.type}&nbsp;
                ${number}호,&nbsp;
                ${format(new Date(findLaw.promulgation_date), 'yyyy.MM.dd.')} ${
      findLaw.amendment_status
    }]</p>
            </div>`;
    const bottom = `</div><tfoot><div class='mainifo-page-footer-space'></div></tfoot><div class='maininfo-page-header'></div><div class='maininfo-page-footer'></div></div></div>`;

    Chapter = Chapter.join('').replace(/null/g, '').replace(/>,</g, '><');
    console.log(Chapter);
    File = File.join('').replace(/null/g, '').replace(/>,</g, '><');
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

    return (
      <div>
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
                  {File}
                  <br />
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

export default PrevMainInfo;
