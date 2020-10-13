const express = require('express');
const router = express.Router();
const searchCon = require('../controller/searchController/index')

router.post("/post", searchCon.searchLaw.searchLaw);

module.exports = router;
