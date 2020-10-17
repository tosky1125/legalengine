const express = require('express');
const searchControllers = require('../controller/search/index');

const router = express.Router();

router.post('/', searchControllers.searchLaw.post)
router.get('/', searchControllers.searchLaw.get)

module.exports = router;
