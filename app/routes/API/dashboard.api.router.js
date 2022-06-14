var express = require('express');
var router = express.Router();
const { index } = require('../../api/dashboard.api')
const { isLoginPlayer } = require('../../middleware/auth');

router.get('/', isLoginPlayer, index);
module.exports = router;