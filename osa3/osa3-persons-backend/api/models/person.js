
//const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'

//const url = 'mongodb:const mongoose = require('mongoose')

const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise

console.log('person url: ', url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person