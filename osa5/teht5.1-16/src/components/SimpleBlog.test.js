import React from 'react'
import { shallow } from 'enzyme'
import Blog from './SimpleBlog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
        title: 'Kona sub-8',
        author: 'Mark Allen',
        url: 'http://triathlonhaaste.blogspot.com/',
        likes: 1
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.likes)

    console.log(contentDiv.debug())
  })

  it('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Kona sub-8',
        author: 'Mark Allen',
        url: 'http://triathlonhaaste.blogspot.com/',
        likes: 1,
        important: true 
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <Blog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  }) 

})