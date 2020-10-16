const express = require('express');
const searchControllers = require('../controller/search/index');

const router = express.Router();

router.post('/', searchControllers.searchLaw.post)
router.get('/laws/:id/:date', searchControllers.searchLaw.get)

module.exports = router;
