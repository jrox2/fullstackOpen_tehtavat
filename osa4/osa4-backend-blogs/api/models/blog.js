//const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'

//const url = 'mongodb:const mongoose = require('mongoose')

const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let url = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
    url = process.env.TEST_MONGODB_URI
}


mongoose.connect(url)
mongoose.Promise = global.Promise

console.log('blog url: ', url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog