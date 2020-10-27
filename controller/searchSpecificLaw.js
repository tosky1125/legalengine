const { simpleTotalData, findLawForInline } = require('../simpleSearch');
module.exports = {
    get: async (req, res) => {
      const { lawName } = req.params;
      const { lawNum, enfDate } = req.query;
      
      // 법령 내부의 inline 링크를 눌렀을 때 lawNum 이 없이 날아오는 경우
      if (!lawNum) {
        res.send(await findLawForInline(lawName, enfDate));
      } else {
        res.send(await simpleTotalData(lawName, enfDate, lawNum));
      }
    }
};