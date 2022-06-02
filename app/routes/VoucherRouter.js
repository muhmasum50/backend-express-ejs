var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const { index, create, store, edit, update, destroy } = require('../controllers/VoucherController');
const multer = require('multer');
const os = require('os')
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);

router.get('/', index);
router.get('/create', create)
router.post('/store', multer({ dest:os.tmpdir() }).single('image'), store)
router.get('/edit/:id', edit)
router.put('/update/:id', multer({ dest:os.tmpdir() }).single('image'), update)
router.delete('/delete/:id', destroy)

module.exports = router;