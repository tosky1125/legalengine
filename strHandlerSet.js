// current this file name is exc, it's shorthand of exception handler
const rmSpaceAndSymbols = (str) => {
    return str.replace(/[^가-힣^0-9]/g, "");
};

// const resBefore = rmSpaceAndSymbols('10ㆍ27법난 피해자의 명예회복 등에 관한 법률 시행령');
// const resCurrent = rmSpaceAndSymbols('10·27법난 피해자의 명예회복 등에 관한 법률 시행령');

// console.log(resBefore);
// console.log(resCurrent);
// console.log(resBefore === resCurrent);

// 1. 법을 찾는다
// 2. 법의 이름에서 한글과 숫자를 제외한 모든 것들을 제거한다
// 3. 만약 그 제거한 값이 같다면, 그 두 개의 법을 같은 법으로 간주한다

// 키워드 만들기
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

// const res = rmSpaceAndSymbols("10ㆍ27법난 피해자의 명예회복 등에 관한 법률");

module.exports = { extractKeyword, rmSpaceAndSymbols };
