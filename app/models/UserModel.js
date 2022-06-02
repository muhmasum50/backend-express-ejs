const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email harus diisi']
    },
    username: {
        type: String,
        required: [true, 'Username harus diisi']
    },
    name: {
        type: String,
        required: [true, 'Nama harus diisi']
    },
    password: {
        type: String,
        required: [true, 'Kata sandi harus diisi']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Nomor HP harus diisi']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
        required: [true, 'status harus diisi']
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);