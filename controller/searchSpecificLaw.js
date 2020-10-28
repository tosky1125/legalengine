const { simpleTotalData, findLawForInline } = require('../simpleSearch');
module.exports = {
    post: async (req, res) => {
      const { lawName } = req.params;
      const { enfDate } = req.body;
      res.send(await simpleTotalData(lawName, enfDate));
    }
};
