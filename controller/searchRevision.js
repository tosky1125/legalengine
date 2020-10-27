const { Law } = require('../models');
const { Op } = require('sequelize');
const { rmSpaceAndSymbols } = require('../strHandlerSet');
const parse = require('date-fns/parse');
  
  module.exports = {
    post: async (req, res) => {
      
      // const justBefore = await Law.findAll({

      // });
      res.send('revision: not yet');
    }
  };
  