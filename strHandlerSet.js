const add = require('date-fns/add');

// 정규표현식을 통해 문자열로부터 숫자와 한글을 제외한 모든 값을 제거하기 
const rmSpaceAndSymbols = (str) => {
    return str.replace(/[^가-힣^0-9]/g, "");
};

// 연관검색에 사용할 키워드 추출하기 + 정규표현식으로 한글과 숫자를 제외한 요소 제거하기
const extractKeyword = (str) => {
    const refinedStr = rmSpaceAndSymbols(str);
    // str 의 length 가 2 이상인 경우,
    // 뒤에서부터 찾아 처음 나온 "법" 의 index 의 앞부분만을 잘라 키워드를 만듬
    // 그렇지 않은 경우(민법, 상법, 세법 등...)는 그냥 그 자체를 키워드로 활용함
    if (refinedStr.length > 2) {
        const indexOfLawTag = refinedStr.lastIndexOf("법");
        if (indexOfLawTag === -1) {
            return refinedStr;
        } else {
            return refinedStr.substring(0, indexOfLawTag);
        }
    } else {
        return refinedStr;
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
