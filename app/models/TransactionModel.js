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
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);