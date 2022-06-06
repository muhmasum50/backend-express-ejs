var express = require('express');
var router = express.Router();
const { landingPage, detailPage } = require('../../api/landing.api');

router.get('/', landingPage);
router.get('/detail/:id', detailPage);

module.exports = router;