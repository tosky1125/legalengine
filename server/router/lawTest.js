const express = require('express');
const searchControllers = require('../controller/index');
const router = express.Router();

router.get('/:lawName', searchControllers.searchSpecificLawTest.get);

module.exports = router;