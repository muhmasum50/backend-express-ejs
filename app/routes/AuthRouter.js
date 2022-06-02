var express = require('express');
var router = express.Router();
const { index, login, register, logout } = require('../controllers/AuthController');

router.get('/', index);
router.get('/login', index);
router.post('/login', login);
router.get('/register', register);
router.get('/logout', logout);

module.exports = router;