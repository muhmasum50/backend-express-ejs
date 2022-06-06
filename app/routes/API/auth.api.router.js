var express = require('express');
var router = express.Router();
const { register } = require('../../api/auth.api');
const multer = require('multer');
const os = require('os')

router.post('/register', multer({ dest:os.tmpdir() }).single('avatar'), register);
// router.get('/detail/:id', detailPage);

module.exports = router;