var express = require('express');
var router = express.Router();
const { index, update } = require('../../api/profile.api');
const { isLoginPlayer } = require('../../middleware/auth');

const multer = require('multer');
const os = require('os');

router.get('/', isLoginPlayer, index);
router.put('/update', isLoginPlayer, multer({ dest:os.tmpdir() }).single('image'), update);

module.exports = router;