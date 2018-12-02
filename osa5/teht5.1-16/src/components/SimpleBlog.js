import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div className="wrapper">
        <div className="content">
        {blog.title} {blog.likes}
        </div>
    
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  
)

export default SimpleBlog