const express = require('express');
const searchControllers = require('../controller/index');
const router = express.Router();

router.get('/', searchControllers.searchNested.get);

module.exports = router;