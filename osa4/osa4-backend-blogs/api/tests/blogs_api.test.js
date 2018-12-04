const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')


const { format, initialBlogs, blogsInDb } = require('../utils/list_helper')


beforeAll(async () => {
  await Blog.remove({})
  


  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(2)
  })
  
  test('the first blog is Kona sub-8', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body[0].title).toBe('Kona sub-8')
  })



  describe('addition of a new blog', async () => {

    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb()
      
      const newBlog = 
    {
      title: 'Kona sub-9',
      author: 'Dave Scott',
      url: 'http://triathlonhaaste.blogspot.com/',
      likes: 1
    }
    

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      const titles = blogsAfterOperation.map(r => r.title)
      expect(titles).toContain('Kona sub-9')
    })

    test('POST /api/blogs with empty likes field', async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = 
    {
      title: 'Swissman',
      author: 'Mikko Lehmuskoski',
      url: 'http://triathlonsuomi.com/minna-myotanen/2016/08/01/vieraskynassa-mikko-lehmuskoski-kun-triathlonharrastus-meni-tunteisiin-swissman-extreme-triathlon-2016/?fbclid=IwAR0rbHfRmYbAAFEBMcdLea86Q3WcZIrJFKTww6uiNbbIr1rSr0QD340YvFA',
      likes: null
    }
    

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      const likesInDB = blogsAfterOperation.map(r => r.likes)
      expect(likesInDB).not.toContain(null)
    })

    test('POST /api/blogs with empty url or title field', async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = 
    {
      title: '',
      author: 'Mark Allen',
      url: '',
      likes: null
    }
    

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

     
    })
  })

afterAll(() => {
  server.close()
})

