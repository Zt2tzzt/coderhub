const dotenv = require('dotenv')

dotenv.config()

console.log('process.env:', env)

module.exports = {
  SERVER_POST
} = process.env
