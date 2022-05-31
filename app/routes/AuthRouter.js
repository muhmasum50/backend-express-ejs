var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const { index, register } = require('../controllers/AuthController');

router.get('/login', index);
router.get('/register', register);

module.exports = router;