const express = require('express');
const searchControllers = require('../controller/search/index');

const router = express.Router();

router.post('/laws', searchControllers.searchLaw.post)
router.get('/laws/:id/:date', searchControllers.searchLaw.get)

module.exports = router;
