const mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama Kategori harus diisi']
    }
})

module.exports = mongoose.model('Category', categorySchema);