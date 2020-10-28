const { simpleTotalData, findLawForInline } = require('../simpleSearch');
module.exports = {
    post: async (req, res) => {
      console.log('body is');
      console.log(req.body);
      console.log('query is');
      console.log(req.query);
      const { lawName } = req.params;
      const { lawNum, enfDate } = req.body;
      
      // 법령 내부의 inline 링크를 눌렀을 때 lawNum 이 없이 날아오는 경우
      if (!lawNum) {
        console.log(enfDate);
        const resCheck = {};
        resCheck.Law = await findLawForInline(lawName, enfDate);
        res.send(resCheck);
        // res.send(await findLawForInline(lawName, enfDate));
      } else {
        res.send(await simpleTotalData(lawName, enfDate, lawNum));
      }
    }
};
