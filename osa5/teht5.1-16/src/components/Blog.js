import React from 'react'
const Blog = ({blog}) => {
 
  return (
  <div className="wrapper">
    <div className="content">
    
      {blog.title}
      {blog.author}
      {blog.url}
      {blog.likes}
    </div>  
    
  </div>
  )
}

export default Blog