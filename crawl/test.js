const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require('../models/index');
let puppeteer = require('puppeteer');

let spec = async () => {

  // 법령 목록에서 아이디 k 값을 찾는다.

  let data = await Law.findOne({
    where: {
      law_id: k,
    },
  });

  let url = `http://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=${data.number}&chrClsCd=010202&urlMode=lsInfoP&ancYnChk=0&mobile=#0000`;

  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  let result = await page.evaluate(() => {
    //연산에 필요한 변수와 함수들을 선언
    //puppeteer 작동원리 상 외부에서 함수, 또는 변수를 불러올 수 없다.     
    //반대로 evalute 메소드 내에서 dom 을 이용해 연산하는 것들을 밖으로 내보낼 수 없다. 

    const ho = ['0.', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', '13.', '14.', '15.', '16.', '17.', '18.', '19.', '20.', '21.', '22.', '23.', '24.', '25.', '26.', '27.', '28.', '29.', '30.', '31.', '32.', '33.', '34.', '35.', '36.', '37.', '38.', '39.', '40.', '41.', '42.', '43.', '44.', '45.', '46.', '47.', '48.', '49.', '50.'];
    const hang = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];
    const mok = ['가.', '나.', '다.', '라.', '마.', '바.', '사.', '아.', '자.', '차.', '카.', '타.', '파.', '하.', '1)', '2)', '3)', '4)', '5)', '6)', '7)', '8)', '9)', '0)'];

    let chapter = [],
      article = [],
      clause = [],
      subPara = [],
      item = [],
      chapterNum = undefined,
      articleNum = null,
      clauseNum = undefined,
      subParNum = undefined,
      itemNum = null,
      hhjm = '';

    let state = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (ho.indexOf(`${str[i]}${str[i+1]}`) !== -1) {
          hhjm = '호';
          break;
        } else if (mok.indexOf(`${str[i]}${str[i+1]}`) !== -1) {
          hhjm = '목';
          break;
        } else if (hang.indexOf(str[i]) !== -1) {
          hhjm = '항';
          break;
        } else if (str[i] + 1 !== ' ') {
          hhjm = '조';
        }
      };
    };

    let chapSlice = (str) => {
      let tmp = str.slice(2);
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === ':') {
          return `${tmp.slice(0, i)}:0`;
        }
      }
    };

    let arSlice = (str) => {
      let tmp = str.slice(1);
      let sliceResult;
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === ':') {
          sliceResult = `${tmp.slice(0, i)}:0`;
        };
      };
      if (tmp[tmp.length] - 1 !== '0') {
        return tmp;
      } else {
        return sliceResult;
      }
    };
    //body 는 본문, subText 는 부칙의 배열
    let body = Array.from(document.querySelector('#conScroll').children);
    let subText = Array.from(document.querySelector('#arDivArea').children);
    //본문을 순회하면서 id 값으로 편장절관과 조항호목으로 분류
    //조항호목은 class가 일관되지 않기에 해당 context를 판단해서 분류해야함.
    //일단 전부 조로 분류
    body.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        if (ele.id.includes('P')) {
          chapterNum = chapSlice(ele.id);
          let chapDate = null;
          //장에 date가 있는 경우가 있기 때문에, 하위 노드를 파악해서 date 를 할당.
          if (body[index + 1].children[0].lastChild.className === 'sfon') {
            chapDate = body[index + 1].children[0].lastChild.textContent;
          };
          //context 의 경우에는 별도의 태그로 감싸 있지 않기 때문에 제목과 날짜가 붙어 있다. 불러온 뒤에 replace 로 날려준다.
          let cont = body[index + 1].innerText.slice(8).replace(chapDate, '');
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
              chapter_id: chapterNum,
              context: null,
              date: null,
            })
          }

          articleNum = arSlice(ele.id)
          article.push({
            chapter_id: chapterNum,
            article_number: articleNum,
            title: null,
            context: null,
            child: body[index + 1].children,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          })
        }
      };
    });
    let length = chapter.length;
    // 부칙의 경우 본문과 element 구조가 다름. 일단 편장절관을 찾아 조항호목을 자식 node 로 넣어준다.
    subText.forEach((ele, index) => {
      if (ele.nodeName === 'A' && ele.id === ele.name) {
        chapterNum = ele.id.slice(1);
        let date = null;
        if (subText[index + 1].children[0].children[2].lastChild.className === 'sfon') {
          date = subText[index + 1].children[0].children[2].lastChild.textContent
        };
        let cont = subText[index + 1].children[0].children[2].textContent.replace(date, '')
        chapter.push({
          chapter_number: chapterNum,
          date: date,
          context: cont,
          child: subText[index + 1].children,
        });
      };
    });
    // 본문에서 전부 조의 하위노드로 분류한 것들을 항 호 목으로 분류 
    article.forEach(ele => {
      let button = Array.from(ele.child[0].children);
      let texts = null;
      if (ele.child[1]) texts = Array.from(ele.child[1].children);
      else texts = ele.child[0].textContent;
      button.forEach(ele => {
        if (ele.lastChild.title.includes('조문')) ele.flag_pan = 1
        else if (ele.lastChild.firstChild.alt === '연혁') ele.flag_yeon = 1
        else if (ele.lastChild.title.includes('행정')) ele.flag_hang = 1
        else if (ele.lastChild.title.includes('규정')) ele.flag_gyu = 1
      })

      // 하위 노드가 있는 경우와 없는 경우로 분류.
      // 없다면 바로 context를 받아 '조'로 마무리
      // 있다면 순회하면서 호 항 목 으로 분류 
      if (typeof texts === 'string') {
        ele.context = texts;
      } else {
        for (let j = 0; j < texts.length; j++) {
          //context 의 경우에는 별도의 태그로 감싸 있지 않기 때문에 제목과 날짜가 붙어 있다. 불러온 뒤에 replace 로 날려준다.
          let cont = texts[j].textContent;
          let date = null;
          // 항 호 목의 날짜가 아닌 조의 날짜의 경우 해당 class 로 날짜값만 있기에 하위 연산 필요없음. continue 로 다음 loop 실행
          if (texts[j].className === 'pty1_de2') {
            ele.date = cont
            continue;
          }

          // 조의 0번째 index 의 태그에는 무조건 타이틀이 있음. 조 밑으로 들어온 것이기 때문에 조가 없는 경우는 없음.
          if (j === 0) {
            ele.title = texts[j].children[1].textContent
          }
          // 'sfon' class 는 날짜를 뜻하는데 조 자체의 날짜가 아닌 조의 하위 항호목의 날짜로 들어가기 때문에 미리 날짜변수에 할당
          if (texts[j].lastChild.className === 'sfon') {
            date = texts[j].lastChild.textContent;
          }
          //context 에서 날짜와 제목을 날려준다.
          cont = cont.replace(ele.title, '').replace(date, '')
          // context를 잘라서 항호목을 파악해서 jjhm 변수에 결과값을 할당
          const checkState = cont.slice(0, 9);
          state(checkState);

          if (hhjm === '항') {
            // 하위 카테고리의 index는 null값으로 초기화 
            if (clauseNum === undefined) {
              clauseNum = null;
            }
            clauseNum++;
            subParNum = null;
            itemNum = null;
            clause.push({
              chapter_id: ele.chapter_id,
              article_id: ele.article_number,
              clause_number: clauseNum,
              date: date,
              context: cont,
            })
          } else if (hhjm === '호') {
            // 하위 카테고리의 index는 null값으로 초기화 
            if (subParNum === undefined) {
              subParNum = null;
            };
            subParNum++;
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
              })
            }
            subPara.push({
              chapter_id: ele.chapter_id,
              article_id: ele.article_number,
              clause_id: clauseNum,
              sub_number: subParNum,
              date: date,
              context: cont,
            })

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
              })
            }

            if (subParNum === undefined) {
              subParNum = null;
              subPara.push({
                chapter_id: ele.chapter_id,
                article_id: ele.article_number,
                clause_number: clauseNum,
                sub_number: subParNum,
                date: null,
                context: null,
              })
            }
            itemNum++;
            item.push({
              chapter_id: ele.chapter_id,
              article_id: ele.article_number,
              clause_id: clauseNum,
              sub_id: subParNum,
              item_number: itemNum,
              date: date,
              context: cont,
            })
          } else {
            // 항호목이 아닌 경우의 context는 조의 context 로 할당
            ele.context = cont
          }
        }
      }
      // loop 가 끝날 때마다 값을 초기화
      clauseNum = undefined;
      subParNum = undefined;
      itemNum = null;
    })
    // 부칙 분류
    for (let i = length; i < chapter.length; i++) {
      // 부칙은 편장절관 자식 노드에 조 항 호 목이 있기에 배열로 분류 
      // 본문에서는 조에 A태그가 붙어 있었지만 해당 값에는 ID값을 줄 수 없기에 선언
      let array = Array.from(chapter[i].child)
      let artDate = null;
      let artNum = undefined;
      if (array.length === 3) {
        array[2] = Array.from(array[2].children)
        array = array.flat();
      }
      for (let j = 1; j < array.length; j++) {
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
          artNum++;
          article.push({
            chapter_id: chapter[i].chapter_number,
            article_number: artNum,
            title: title,
            context: null,
            date: artDate,
            flag_yeon: null,
            flag_hang: null,
            flag_gyu: null,
            flag_pan: null,
          })
        }
        if (array[j].children.length > 0 && array[j].hasChildNodes('IMG')) {
           cont = array[j].lastElementChild.src;
           hhjm = '목'
        }else{
        cont = cont.replace(title, '').replace(date, '');
        const checkState = cont.slice(0, 9);
        // context를 잘라서 항호목을 파악해서 jjhm 변수에 결과값을 할당
        state(checkState);
        }
        if (hhjm === '항') {
          // 하위 카테고리의 index는 null값으로 초기화 
          // 상위 카테고리가 없는 경우는 null 값으로 생성
          if (clauseNum === undefined) {
            clauseNum = null;
          }
          clauseNum++;
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
            })
          }
          clause.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_number: clauseNum,
            date: date,
            context: cont,
          })
          subParNum = undefined;
          itemNum = undefined;
        } else if (hhjm === '호') {
          // 하위 카테고리의 index는 null값으로 초기화 
          // 상위 카테고리가 없는 경우는 null 값으로 생성
          if (subParNum === undefined) {
            subParNum = null;
          }
          subParNum++;
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
            })
          }
          if (clauseNum === undefined) {
            clauseNum = null;
            clause.push({
              chapter_id: chapter[i].chapter_number,
              article_id: artNum,
              clause_number: clauseNum,
              date: null,
              context: null,
            })
          }
          subPara.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_id: clauseNum,
            sub_number: subParNum,
            date: date,
            context: cont,
          })
          itemNum = undefined;
        } else if (hhjm === '목') {
          itemNum++;
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
            })
          }
          if (clauseNum === undefined) {
            clauseNum = null;
            clause.push({
              chapter_id: chapter[i].chapter_number,
              article_id: artNum,
              clause_number: clauseNum,
              date: null,
              context: null,
            })
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
            })
          }
          item.push({
            chapter_id: chapter[i].chapter_number,
            article_id: artNum,
            clause_id: clauseNum,
            sub_id: subParNum,
            item_number: itemNum,
            date: date,
            context: cont,
          })
        } else {
          clauseNum = undefined;
          subParNum = undefined;
          itemNum = undefined;

          let selectedArticle = article[article.length - 1];

          if (selectedArticle.chapter_id === chapter[i].chapter_number && title) {
            article[article.length - 1].context = cont
          } else {
            if (artNum === undefined) {
              artNum = null;
            }
            artNum++
            article.push({
              chapter_id: chapter[i].chapter_number,
              article_number: artNum,
              title: title,
              context: cont,
              date: artDate,
              flag_yeon: null,
              flag_hang: null,
              flag_gyu: null,
              flag_pan: null,
            })
          }
        }
      }
      clauseNum = undefined;
      subParNum = undefined;
      itemNum = undefined;
    }
    return {
      chapter,
      article,
      clause,
      subPara,
      item
    }
  })
  await browser.close()
  return result;
}


const init = async () => {
  let {
    chapter,
    article,
    clause,
    subPara,
    item,
  } = await spec();
  const a = k;
  chapter.forEach(async ele => {
    let {
      chapter_number,
      date,
      context
    } = ele;
    await Chapter.create({
      law_id: a,
      chapter_id : chapter_number,
      date,
      context,
    });
  });

  article.forEach(async ele => {
    let {
      chapter_id,
      article_number,
      title,
      date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    } = ele;
    
    let tmp = await Chapter.findOne({
      where :{
        law_id : a,
        chapter_id,
      }, raw : true
    })
    chapter_id =tmp.chapter_id;

    await Article.create({
      law_id: a,
    chapter_id,
    article_title: title,
    article_id : article_number,
    date,
    context,
    flag_pan,
    flag_yeon,
    flag_hang,
    flag_gyu,
    });
  });

  clause.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_number,
      date,
      context
    } = ele;
    let tmp = await Article.findOne({
      where :{
        law_id : a,
        chapter_id,
        article_id,
      }, raw : true
    })
    article_id =tmp.article_id;
    
    await Clause.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id : clause_number,
      date,
      context,
    })
  })

  subPara.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_number,
      date,
      context
    } = ele;
    let tmp = await Clause.findOne({
      where :{
        law_id : a,
        chapter_id,
        article_id,
        clause_id,
      }, raw : true
    })
    clause_id =tmp.clause_id;
    
    await Subparagraph.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id,
      sub_id : sub_number,
      date,
      context,
    })
  })

  item.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_number,
      date,
      context
    } = ele;

    let tmp = await Subparagraph.findOne({
      where :{
        law_id : a,
        chapter_id,
        article_id,
        clause_id,
        sub_id,
      }, raw : true
    })
    sub_id =tmp.sub_id;
    
    await Item.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_id : item_number,
      date,
      context
    })
  })
  k++ ;
}




let k = 1;
setInterval(init, 10000);
