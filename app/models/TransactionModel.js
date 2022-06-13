const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName    : { type: String, required: [true, 'Nama game harus diisi'] },
        category    : { type: String, required: [true, 'Kategori harus diisi'] },
        thumbnail   : { type: String },
        coinName    : { type: String,required: [true, 'Nama koin harus diisi'] },
        coinQuantity: { type: String, required: [true, 'Jumlah koin harus diisi'] },
        price       : { type: Number }
    },
    historyPayment: {
        name        : {type: String, required: [true, 'Nama harus diisi']},
        type        : {type: String, required: [true, 'Tipe Pembayaran harus diisi']},
        bankName    : {type: String, required: [true, 'Nama Bank harus diisi']},
        bankNumber  : {type: String, required: [true, 'Nomor Rekening harus diisi']},
    },
    name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        maxlength: [225, "Nama tidak boleh lebih dari 225 karakter"],
        minlength: [3, "Nama tidak boleh kurang dari 3 karakter"]
    },
    accountUser: {
        type: String,
        required: [true, 'Nama akun harus diisi'],
        maxlength: [225, "Nama akun tidak boleh lebih dari 225 karakter"],
        minlength: [3, "Nama akun tidak boleh kurang dari 3 karakter"]
    },
    tax: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser: {
        name: {type: String, required: [true, 'Nama player harus diisi']},
        phoneNumber: {
            type: Number,
            required: [true, 'Nomor HP harus diisi'],
            maxlength: [13, "Nomor HP tidak boleh lebih dari 13 karakter"],
            minlength: [9, "Nomor HP tidak boleh kurang dari 9 karakter"]
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);