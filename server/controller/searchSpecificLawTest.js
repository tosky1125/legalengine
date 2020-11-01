const simpleSearch = require('../helpers/simpleSearch');
module.exports = {
    get: async (req, res) => {
      const { lawName } = req.params;
      const { lawNum, enfDate } = req.query;
      res.send(await simpleSearch(lawName, enfDate, lawNum));
    }
};