var express = require('express');
var router = express.Router();
const { index, checkout, history } = require('../../api/transaction.api')
const { isLoginPlayer } = require('../../middleware/auth');

router.get('/', isLoginPlayer, index);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);

module.exports = router;