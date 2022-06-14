const mongoose = require('mongoose');
let bankSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama pimilik bank harus diisi']
    },
    bankName: {
        type: String,
        required: [true, 'Nama bank harus diisi']
    },
    bankNumber: {
        type: Number,
        required: [true, 'Nomor rekening harus diisi']
    }
}, {timestamps: true})

module.exports = mongoose.model('Bank', bankSchema);