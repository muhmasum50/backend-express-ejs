const mongoose = require('mongoose')
const { DB_URL } = require('../config')

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = db;