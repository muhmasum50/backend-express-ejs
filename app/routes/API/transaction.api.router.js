var express = require('express');
var router = express.Router();
const { index, checkout, history, detail } = require('../../api/transaction.api')
const { isLoginPlayer } = require('../../middleware/auth');

router.get('/', isLoginPlayer, index);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/detail/:id', isLoginPlayer, detail);


module.exports = router;