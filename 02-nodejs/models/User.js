const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise

const options = {
  useMongoClient: true
}
mongoose.connect('mongodb://localhost/mediastream-challenge', options)

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
