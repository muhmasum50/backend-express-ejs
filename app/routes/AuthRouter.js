var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const { index } = require('../controllers/AuthController');

router.get('/login', index);

module.exports = router;