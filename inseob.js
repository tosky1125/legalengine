let strWithTag = '<a href="/law/119구조구급에관한법률?enfDate=2020-08-05" target="_blank"> 「119구조ㆍ구급에 관한 법률」</a>';

let str = '119, 「119구조ㆍ구급에 관한 법률」, <a>119<a>';

// html 태그의 attributes 는 전부 패스한다
// html 태그 안의 text 만 골라서 한다 

const changeStr = (str, keyword) => {
    const bracket = new Set(['<', '>']);
    let isOn = false;
    const {
      length
    } = keyword;
    for (let i = 0; i < str.length; i++) {
      const keyCheck = str.slice(i, i + length);
      if (bracket.has(str[i])) {
        isOn = !isOn;
      }
      if (!isOn && keyCheck === keyword) {
        const tmp1 = str.slice(0, i);
        const tmp2 = str.slice(i + length, str.length);
        str = `${tmp1}thishashkey${tmp2}`;
      }
    }
    str = str.replace(/thishashkey/g, `<span class='keyword-highlight'>${keyword}</span>`);
    return str;
  };

console.log(changeStr(strWithTag, '119'));