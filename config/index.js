const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    SERVICE_NAME: process.env.SERVICE_NAME,
    DB_URL: process.env.MONGO_URL
}