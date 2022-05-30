var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const { index } = require('../controllers/DashboardController');

/* GET home page. */
router.get('/', index);

module.exports = router;