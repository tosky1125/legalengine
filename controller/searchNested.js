const totalData = require('../searchNested');
module.exports = {
    get: async (req, res) => {
      const { lawName } = req.params;
      const { lawNum, enfDate } = req.query;
      res.send(await totalData(lawName, enfDate, lawNum));
    }
};