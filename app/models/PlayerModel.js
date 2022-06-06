const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
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
    avatar: {
        type: String,
        required: [false, 'Avatar harus diisi']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
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

playerSchema.path('email').validate(async function (value) {
    try {
        let player = await this.model('Player').findOne({email: value})
        
        return !player
    } catch (error) {
        throw error;
    }
}, attr => `${attr.value} sudah digunakan`)

playerSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
});

module.exports = mongoose.model('Player', playerSchema);