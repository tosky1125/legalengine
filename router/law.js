const express = require('express');
const searchControllers = require('../controller/index');
const router = express.Router();

router.post('/:lawName', searchControllers.searchSpecificLaw.post);

module.exports = router;
