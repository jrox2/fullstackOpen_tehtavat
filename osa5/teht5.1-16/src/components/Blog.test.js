import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

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
    console.log(contentDiv.debug())
  })

  it('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Kona sub-8',
        author: 'Mark Allen',
        url: 'http://triathlonhaaste.blogspot.com/',
        likes: 1
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <Blog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const nameDiv = blogComponent.find('.nameDiv')
    nameDiv.simulate('click')
    
  
    expect(mockHandler.mock.calls.length).toBe(1)
  })

})