const express = require('express');
const searchControllers = require('../controller/search/index');

const router = express.Router();

router.post('/', searchControllers.searchRevision.post);

module.exports = router;
