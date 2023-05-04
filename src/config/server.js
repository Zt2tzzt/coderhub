const dotenv = require('dotenv')

dotenv.config()

// console.log('process.env:', process.env)

module.exports = {
  SERVER_PORT,
  SERVER_HOST
} = process.env
