/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-empty */
/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const {
  format,
} = require('date-fns');
const {
  Op,
} = require('sequelize');
// const diff = require('./diff');
const {
  Law,
} = require('../models/index');
// const revision = require('../testR');

const spec = async (data) => {
  
  if (data === null) {
    const result = null;
    return result;
  }
  const justBefore = await Law.findOne({
    where: {
      refined_name: data.refined_name,
      enforcement_date: {
        [Op.lt]: data.enforcement_date,
      },
    },
    raw: true,
  });
  data.oldLaw = justBefore;

  const url = `https://www.law.go.kr/lsInfoP.do?lsiSeq=${data.number}&efYd=${format(new Date(data.enforcement_date), 'yyyyMMdd')}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  const result = await page.evaluate(() => {
    // 연산에 필요한 변수와 함수들을 선언
    // puppeteer 작동원리 상 외부에서 함수, 또는 변수를 불러올 수 없다.
    // 반대로 evalute 메소드 내에서 dom 을 이용해 연산하는 것들을 밖으로 내보낼 수 없다.

    const ho = new Set(['0.', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', '13', '14', '15', '16', '17', '18', '19.', '20.']);
    const mok = new Set(['가.', '나.', '다.', '라.', '마.', '바.', '사.', '아.', '자.', '차.', '카.', '타.', '파.', '하.', '1)', '2)', '3)', '4)', '5)', '6)', '7)', '8)', '9)', '10)', '11)', '12)', '13)', '14)', '15)', '16)', '17)', '18)', '19)', '20)']);

    const chapter = [];
    const article = [];
    const clause = [];
    const subPara = [];
    const item = [];
    const file = [];
    let chapterNum;
    let chapterSpare = null;
    let articleNum = null;
    let clauseNum;
    let subParNum;
    let itemNum = null;
    let hhjm = '';
    const state = (str) => {
      str = str.replace(/\s+/, '');
      const twoCharFront = `${str[0]}${str[1]}`;
      const threeCharFront = `${str[0]}${str[1]}${str[2]}`;
      const charCode = str[0].charCodeAt();
      if (ho.has(twoCharFront) || ho.has(threeCharFront)) {
        hhjm = '호';
      } else if (mok.has(twoCharFront) || mok.has(threeCharFront)) {
        hhjm = '목';
      } else if ((charCode >= 0x2460 && charCode <= 0x2473) || charCode >= 0x3251 && charCode <= 0x325F) {
        hhjm = '항';
      } else {
        hhjm = '조';
      }
    };

    const chapSlice = (str) => {
      const tmp = str.slice(2);
      let chapSliceResult;
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === ':') {
          chapSliceResult = `${tmp.slice(0, i)}:0`;
        }
      }
      return chapSliceResult;
    };
    const chapSpare = (str, spare) => {
      const tmp = str.slice(2);
      let chapSpareResult;
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === ':') {
          chapSpareResult = `${tmp.slice(0, i)}:${spare}`;
        }
      }
      return chapSpareResult;
    };
    const arSlice = (str) => {
      const tmp = str.slice(1);
      let sliceResult;
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === ':') {
          sliceResult = `${tmp.slice(0, i)}:0`;
        }
      }
      if (tmp[tmp.length] - 1 !== '0') {
        sliceResult = tmp;
      }
      return sliceResult;
    };
    const pgroupCheck = (body, index) => {
      let i = 1;
      while (body[index + i].nodeName !== 'DIV' && body[index + i].className !== 'pgroup') {
        i++;
      }
      return i;
    }
    // body 는 본문, subText 는 부칙의 배열
    // eslint-disable-next-line no-undef
    const html = document.querySelector('#conScroll').outerHTML;
    const body = Array.from(document.querySelector('#conScroll').children);
    const subText = document.querySelector('#arDivArea') ? Array.from(document.querySelector('#arDivArea').children) : null;
    const attached = Array.from(document.querySelectorAll('.pcf_cover'));
    // 본문을 순회하면서 id 값으로 편장절관과 조항호목으로 분류
    // 조항호목은 class가 일관되지 않기에 해당 context를 판단해서 분류해야함.
    // 일단 전부 조로 분류

    attached.forEach((ele) => {
      const data = {
        context: null,
        hwp: null,
        pdf: null,
        date: null,
      };
      let cont = ele.textContent;
      const arr = Array.from(ele.children);
      const filteredArr = arr.filter((e) => {
        if (e.nodeName === 'A' && e.className !== 'blu' && e.href !== '') {
          return e;
        }
      });
      const dateArr = arr.filter((e) => {
        if (e.nodeName === 'SPAN') return e;
      });
      if (filteredArr.length >= 1) {
        data.hwp = filteredArr[0].href;
        data.pdf = filteredArr[1] ? filteredArr[1].href : null;
      }
      if (dateArr.length === 1) {
        data.date = dateArr[0].textContent.replace(/\s+$/, '');
      }
      cont = cont.replace(/\s+$/, '').replace(/\s+/, '').replace(data.date, '');
      data.context = cont;
      file.push(data);
    });

    body.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        if (ele.id.includes('P')) {
          if (chapterNum === chapSlice(ele.id)) {
            chapterSpare += 1;
            chapterNum = chapSpare(ele.id, chapterSpare);
          } else {
            chapterNum = chapSlice(ele.id);
            chapterSpare = null;
          }
          let chapDate = null;
          // 장에 date가 있는 경우가 있기 때문에, 하위 노드를 파악해서 date 를 할당.
          if (body[index + 1].children[0].lastChild.className === 'sfon') {
            chapDate = body[index + 1].children[0].lastChild.textContent;
          }
          // context 의 경우에는 별도의 태그로 감싸 있지 않기 때문에 제목과 날짜가 붙어 있다. 불러온 뒤에 replace 로 날려준다.
          const cont = body[index + 1].innerText.slice(8).replace(chapDate, '');
          chapter.push({
            chapter_number: chapterNum,
            context: cont,
            date: chapDate,
          });
        } else {
          // 관계형 데이터 베이스 특성 상 상위 카테고리와 끊어지면 안되기에, 편장절관이 없는 경우 null 값으로 만들어준다.
          if (chapterNum === undefined) {
            chapterNum = null;
            chapter.push({
              chapter_number: chapterNum,
              context: null,
              date: null,
            });
          }

          articleNum = arSlice(ele.id);
          let i = 1;
          let bodyChild = body[index + pgroupCheck(body, index)].children;
          let text = null;
          bodyChild.length === 0 ? text = body[index + pgroupCheck(body, index)].textContent : false;
          article.push({
            chapter_id: chapterNum,
            article_number: articleNum,
            title: null,
            context: text,
            child: body[index + pgroupCheck(body, index)].children,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          });
        }
      }
    });
    const {
      length,
    } = chapter;
    // 부칙의 경우 본문과 element 구조가 다름. 일단 편장절관을 찾아 조항호목을 자식 node 로 넣어준다.
    if (Array.isArray(subText)) {
      subText.forEach((ele, index) => {
        if (ele.nodeName === 'A' && ele.id === ele.name) {
          chapterNum = ele.id.slice(1);
          let date = null;
          if (subText[index + 1].children[0].children[2].lastChild.className === 'sfon') {
            date = subText[index + 1].children[0].children[2].lastChild.textContent;
          }
          const cont = subText[index + 1].children[0].children[2].textContent.replace(date, '');
          chapter.push({
            chapter_number: chapterNum,
            date,
            context: cont,
            child: subText[index + 1].children,
          });
        }
      });
    }
    // 본문에서 전부 조의 하위노드로 분류한 것들을 항 호 목으로 분류
    article.forEach((ele) => {
      if (ele.child.length !== 0) {
        const button = Array.from(ele.child[0].children);
        let texts = null;
        if (ele.child[1]) texts = Array.from(ele.child[1].children);
        else texts = ele.child[0].textContent;
        button.forEach((e) => {
          if (e.lastChild.title) {
            if (e.lastChild.title.includes('조문')) ele.flag_pan = 1;
            else if (e.lastChild.firstChild.alt === '연혁') ele.flag_yeon = 1;
            else if (e.lastChild.title.includes('행정')) ele.flag_hang = 1;
            else if (e.lastChild.title.includes('규정')) ele.flag_gyu = 1;
          }
        });

        // 하위 노드가 있는 경우와 없는 경우로 분류.
        // 없다면 바로 context를 받아 '조'로 마무리
        // 있다면 순회하면서 호 항 목 으로 분류
        if (typeof texts === 'string') {
          ele.context = texts.replace(/\s+/, '');
        } else {
          for (let j = 0; j < texts.length; j += 1) {
            // context 의 경우에는 별도의 태그로 감싸 있지 않기 때문에 제목과 날짜가 붙어 있다. 불러온 뒤에 replace 로 날려준다.

            let cont = texts[j].textContent;
            let date = null;
            // 항 호 목의 날짜가 아닌 조의 날짜의 경우 해당 class 로 날짜값만 있기에 하위 연산 필요없음. continue 로 다음 loop 실행
            if (texts[j].className === 'pty1_de2' && texts[j].lastChild && cont.replace(texts[j].lastChild.textContent, '') === '') {
              ele.date = cont;
              continue;
            }
            if (texts[j].className === 'rule_area') {
              continue;
            }
            // 조의 0번째 index 의 태그에는 무조건 타이틀이 있음. 조 밑으로 들어온 것이기 때문에 조가 없는 경우는 없음.
            if (j === 0) {
              ele.title = texts[j].children[1].textContent;
            }
            // 'sfon' class 는 날짜를 뜻하는데 조 자체의 날짜가 아닌 조의 하위 항호목의 날짜로 들어가기 때문에 미리 날짜변수에 할당
            if (texts[j].children.length !== 0 && texts[j].lastChild.className === 'sfon') {
              date = texts[j].lastChild.textContent;
            }
            // context 에서 날짜와 제목을 날려준다.
            cont = cont.replace(ele.title, '').replace(date, '').replace(/\s+/, '');
            // context를 잘라서 항호목을 파악해서 jjhm 변수에 결과값을 할당
            const checkState = cont;
            checkState.replace(/\s+/, '') === '' ? hhjm = 'others' : state(checkState);

            if (hhjm === '항') {
              // 하위 카테고리의 index는 null값으로 초기화
              if (clauseNum === undefined) {
                clauseNum = null;
              }
              clauseNum += 1;
              subParNum = undefined;
              itemNum = null;
              clause.push({
                chapter_id: ele.chapter_id,
                article_id: ele.article_number,
                clause_number: clauseNum,
                date,
                context: cont,
              });
            } else if (hhjm === '호') {
              // 하위 카테고리의 index는 null값으로 초기화
              if (subParNum === undefined) {
                subParNum = null;
              }
              subParNum += 1;
              itemNum = null;
              // 상위 카테고리가 없는 경우는 null 값으로 생성
              if (clauseNum === undefined) {
                clauseNum = null;
                clause.push({
                  chapter_id: ele.chapter_id,
                  article_id: ele.article_number,
                  clause_number: clauseNum,
                  date: null,
                  context: null,
                });
              }
              subPara.push({
                chapter_id: ele.chapter_id,
                article_id: ele.article_number,
                clause_id: clauseNum,
                sub_number: subParNum,
                date,
                context: cont,
              });
            } else if (hhjm === '목') {
              // 상위 카테고리가 없는 경우는 null 값으로 생성
              if (clauseNum === undefined) {
                clauseNum = null;
                clause.push({
                  chapter_id: ele.chapter_id,
                  article_id: ele.article_number,
                  clause_number: clauseNum,
                  date: null,
                  context: null,
                });
              }

              if (subParNum === undefined) {
                subParNum = null;
                subPara.push({
                  chapter_id: ele.chapter_id,
                  article_id: ele.article_number,
                  clause_id: clauseNum,
                  sub_number: subParNum,
                  date: null,
                  context: null,
                });
              }
              itemNum += 1;
              item.push({
                chapter_id: ele.chapter_id,
                article_id: ele.article_number,
                clause_id: clauseNum,
                sub_id: subParNum,
                item_number: itemNum,
                date,
                context: cont,
              });
            } else if (hhjm === 'others') {
              console.error(cont);
            } else { // 항호목이 아닌 경우의 context는 조의 context 로 할당
              ele.context = cont;
              ele.cont_date = date;
            }
          }
        }
        // loop 가 끝날 때마다 값을 초기화
        clauseNum = undefined;
        subParNum = undefined;
        itemNum = null;
      }
    });
    // 부칙 분류
    for (let i = length; i < chapter.length; i += 1) {
      // 부칙은 편장절관 자식 노드에 조 항 호 목이 있기에 배열로 분류
      // 본문에서는 조에 A태그가 붙어 있었지만 해당 값에는 ID값을 줄 수 없기에 선언
      let array = Array.from(chapter[i].child);
      const artDate = null;
      let artNum;
      if (array.length === 3) {
        array[2] = Array.from(array[2].children);
        array = array.flat();
      }

      for (let j = 1; j < array.length; j += 1) {
        cont = array[j].textContent;

        let title = null;
        let date = null;
        if (array[j].children.length > 0 && array[j].children[0].className === 'bl') {
          title = array[j].children[0].textContent;
        }
        if (array[j].lastChild && array[j].lastChild.className === 'sfon') {
          date = array[j].lastChild.textContent;
        }
        // 타이틀을 가지는 것은 '조' 밖에 없기에 타이틀이 true 라면 '조'를 생성 context는 조항호목 분류 후에 추가
        if (title) {
          if (artNum === undefined) {
            artNum = null;
          }
          artNum += 1;
          article.push({
            chapter_id: chapter[i].chapter_number,
            article_number: artNum,
            title,
            context: null,
            date: artDate,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          });
        }
        if (array[j].children.length > 0 && array[j].lastChild.nodeName === 'IMG') {
          cont = array[j].lastElementChild.src;
          hhjm = '목';
        } else {
          cont = cont.replace(title, '').replace(date, '').replace(/\s+/, '');
          const checkState = cont;
          checkState.replace(/\s+/, '') === '' ? hhjm = 'others' : state(checkState);
          // context를 잘라서 항호목을 파악해서 jjhm 변수에 결과값을 할당
        }
        if (hhjm === '항') {
          // 하위 카테고리의 index는 null값으로 초기화
          // 상위 카테고리가 없는 경우는 null 값으로 생성
          if (clauseNum === undefined) {
            clauseNum = null;
          }
          clauseNum += 1;
          if (artNum === undefined) {
            artNum = null;
            article.push({
              chapter_id: chapter[i].chapter_number,
              article_number: artNum,
              title: null,
              context: null,
              date: null,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            });
          }
          clause.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_number: clauseNum,
            date,
            context: cont,
          });
          subParNum = undefined;
          itemNum = undefined;
        } else if (hhjm === '호') {
          // 하위 카테고리의 index는 null값으로 초기화
          // 상위 카테고리가 없는 경우는 null 값으로 생성
          if (subParNum === undefined) {
            subParNum = null;
          }
          subParNum += 1;
          if (artNum === undefined) {
            artNum = null;
            article.push({
              chapter_id: chapter[i].chapter_number,
              article_number: artNum,
              title: null,
              context: null,
              date: null,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            });
          }
          if (clauseNum === undefined) {
            clauseNum = null;
            clause.push({
              chapter_id: chapter[i].chapter_number,
              article_id: artNum,
              clause_number: clauseNum,
              date: null,
              context: null,
            });
          }
          subPara.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_id: clauseNum,
            sub_number: subParNum,
            date,
            context: cont,
          });
          itemNum = undefined;
        } else if (hhjm === '목') {
          if (itemNum === undefined) {
            itemNum = null;
          }
          itemNum += 1;
          if (artNum === undefined) {
            artNum = null;
            article.push({
              chapter_id: chapter[i].chapter_number,
              article_number: artNum,
              title: null,
              context: null,
              date: null,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            });
          }
          if (clauseNum === undefined) {
            clauseNum = null;
            clause.push({
              chapter_id: chapter[i].chapter_number,
              article_id: artNum,
              clause_number: clauseNum,
              date: null,
              context: null,
            });
          }
          if (subParNum === undefined) {
            subParNum = null;
            subPara.push({
              chapter_id: chapter[i].chapter_number,
              article_id: artNum,
              clause_id: clauseNum,
              sub_number: subParNum,
              date: null,
              context: null,
            });
          }
          item.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_id: clauseNum,
            sub_id: subParNum,
            item_number: itemNum,
            date,
            context: cont,
          });
        } else if (hhjm === 'others') {} else {
          clauseNum = undefined;
          subParNum = undefined;
          itemNum = undefined;

          const selectedArticle = article[article.length - 1];

          if (selectedArticle.chapter_id === chapter[i].chapter_number && title) {
            article[article.length - 1].context = cont;
          } else {
            if (artNum === undefined) {
              artNum = null;
            }
            artNum += 1;
            article.push({
              chapter_id: chapter[i].chapter_number,
              article_number: artNum,
              title,
              context: cont,
              date: artDate,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            });
          }
        }
      }
      clauseNum = undefined;
      subParNum = undefined;
      itemNum = undefined;
    }
    // nested 구조 
    item.forEach(ele => {
      const {
        chapter_id,
        article_id,
        clause_id,
        sub_id
      } = ele;
      subPara.forEach(e => {
        if (!e.item) {
          e.item = [];
        }
        if (e.chapter_id === chapter_id && e.article_id === article_id && e.clause_id === clause_id && e.sub_number === sub_id) {
          e.item.push(ele);
        }
      })
    })

    subPara.forEach(ele => {
      const {
        chapter_id,
        article_id,
        clause_id
      } = ele;
      clause.forEach(e => {
        if (!e.subPara) {
          e.subPara = [];
        }
        if (e.chapter_id === chapter_id && e.article_id === article_id && e.clause_number === clause_id) {
          e.subPara.push(ele);
        }
      })
    })

    clause.forEach(ele => {
      const {
        chapter_id,
        article_id
      } = ele;
      article.forEach(e => {
        if (!e.clause) {
          e.clause = [];
        }
        if (e.chapter_id === chapter_id && e.article_number === article_id) {
          e.clause.push(ele);
        }
      })
    })

    article.forEach(ele => {
      const {
        chapter_id
      } = ele;
      chapter.forEach(e => {
        if (!e.article) {
          e.article = [];
        }
        if (e.chapter_number === chapter_id) {
          e.article.push(ele);
        }
      })
    })
    return {
      chapter,
      article,
      clause,
      subPara,
      item,
      html,
      file,
    };
  });
  await browser.close();
  result.data = data;
  return result;
};

// const checkRevision = async (law_number, law_eDate, article_id, clause_id = null, sub_id = null, item_id = null) => {
//   const result = await revision(law_number,
//     law_eDate,
//     article_id,
//     clause_id,
//     sub_id,
//     item_id);
//   return result;
// };


module.exports = spec;