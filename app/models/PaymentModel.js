const mongoose = require('mongoose');
let paymentSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type harus diisi']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
        required: [true, 'status harus diisi']
    },
    banks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }]
})

module.exports = mongoose.model('Payment', paymentSchema);