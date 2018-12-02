const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
  console.log('getti muutettu asynciksi: ')
})


blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
      
    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  try {

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'token missing or malformatted id' })
  }
})


blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (body.title === '') {
      return response.status(400).json({ error: 'title missing' })
    }

    if (body.url === '') {
      return response.status(400).json({ error: 'url missing' })
    }

    console.log('title: ', body.likes, ' likes: ', body.likes)
    
    if (body.likes === null) {
        body.likes = 0
        console.log('null likes set zero')
    }

    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(formatBlog(blog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const user = await User.findById(body.user)


    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }

    
    if (body.title === '') {
      return response.status(400).json({ error: 'title missing' })
    }

    if (body.url === '') {
      return response.status(400).json({ error: 'url missing' })
    }


    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    
    response.json(Blog.format(blog))
    console.log(' updatedBlog: ', updatedBlog)

     

  } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
  }
   
})

module.exports = blogsRouter