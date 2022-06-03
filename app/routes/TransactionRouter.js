var express = require('express');
var router = express.Router();
const { index, updateStatus } = require('../controllers/TransactionController');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.put('/status/:id', updateStatus)

module.exports = router;