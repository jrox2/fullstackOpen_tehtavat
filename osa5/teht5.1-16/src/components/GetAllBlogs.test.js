import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from './Blog2'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders all blogs it gets from backend', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})