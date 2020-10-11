const express = require('express');
const router = express.router();
const searchCon = require('../controller/searchController')

router.post("/search/post", searchCon.searchLaw)