const express = require('express');
const searchControllers = require('../controller/index');
const router = express.Router();

router.post('/', searchControllers.searchLawList.post);

module.exports = router;
