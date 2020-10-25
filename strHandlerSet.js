const add = require('date-fns/add');

// 정규표현식을 통해 문자열로부터 숫자와 한글을 제외한 모든 값을 제거하기 
const rmSpaceAndSymbols = (str) => {
    return str.replace(/[^가-힣^0-9]/g, "");
};

// 법의 이름으로부터 키워드 만들기
const extractKeyword = (str) => {
    // 먼저 법의 이름에 띄어쓰기가 되어있는 경우 띄어쓰기 기준으로 단어를 잘라준다
    const splittedStr = str.split(' ');
    // 그러나 띄어쓰기가 없는 법명이 인자로 들어와 띄어쓰기 단위로 잘리지 않았다면, 그냥 string 을 substring 으로 잘라준다
    if (splittedStr.length === 1) {
        const halfLength = Math.floor(str.length / 2);
        const partOfsplittedStr = str.substring(0, halfLength);
        return partOfsplittedStr;
        // 위의 경우가 아니라 일반적인 띄어쓰기 규칙이 적용된 경우라면 keyword 의 절반에 해당하는 값을 잘라준다
    } else {
        const halfLength = Math.floor(splittedStr.length / 2);
        const partOfsplittedStr = splittedStr.slice(0, halfLength);
        return partOfsplittedStr.reduce((accm, curr) => {
            return accm + ' ' + curr;
        });
    }
};

// 전달받은 날짜 + 시간 문자열을 정제하기
const parseDate = (dateStr) => {
    const parsedDate = add(new Date(dateStr), {
        days: 1,
        hours: -15
    });
    return parsedDate;
};


module.exports = { extractKeyword, rmSpaceAndSymbols, parseDate };
