import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog2'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
        title: 'Kona sub-8',
        author: 'Mark Allen',
        url: 'http://triathlonhaaste.blogspot.com/',
        likes: 1
        
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.contentDiv')

    expect(contentDiv.text()).toContain(blog.author)
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

  
    const contentDiv = blogComponent.find('.contentDiv')
    
    expect(contentDiv.text()).toContain(blog.likes)

    const button = blogComponent.find('button')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(1)

    
  })

})