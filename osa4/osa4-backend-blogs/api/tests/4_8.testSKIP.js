
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

describe.skip('list helpers', () => {
    test('dummy is called', () => {
      const blogs = []
  
      const result = listHelper.dummy(blogs)
      expect(result).toBe(1)
    })
  
    describe('total likes', () => {
      test('of empty list is 0', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
      })
  
      // ...
    })
  })