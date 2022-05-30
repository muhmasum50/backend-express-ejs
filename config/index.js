const dotenv = require('dotenv');
const path = require('path');

dotenv.config()

module.exports = {
    ROOT_PATH: path.resolve(__dirname, '..'),
    SERVICE_NAME: process.env.SERVICE_NAME,
    DB_URL: process.env.MONGO_URL
}