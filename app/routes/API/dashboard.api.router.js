var express = require('express');
var router = express.Router();
const { index, profile } = require('../../api/dashboard.api')
const { isLoginPlayer } = require('../../middleware/auth');

router.get('/', isLoginPlayer, index);
router.get('/profile', isLoginPlayer, profile);

module.exports = router;