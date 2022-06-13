var express = require('express');
var router = express.Router();
const { index, checkout } = require('../../api/transaction.api')
const { isLoginPlayer } = require('../../middleware/auth');

router.get('/', isLoginPlayer, index);
router.post('/checkout', isLoginPlayer, checkout);

module.exports = router;