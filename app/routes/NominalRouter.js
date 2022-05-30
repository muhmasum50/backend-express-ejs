var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const { index, create, store, edit, update, destroy } = require('../controllers/NominalController');

router.get('/', index);
router.get('/create', create)
router.post('/store', store)
router.get('/edit/:id', edit)
router.put('/update/:id', update)
router.delete('/delete/:id', destroy)

module.exports = router;