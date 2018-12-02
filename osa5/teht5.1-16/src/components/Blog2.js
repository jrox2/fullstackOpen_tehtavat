import React from 'react'
import Togglable2 from './Togglable2'

const Blog = ({blog, onClick}) => {
  
  
  return (
    
        <Togglable2 className='nameDiv' onClick={onClick} buttonLabel={blog.title} ref={component => this.blogForm = component}>
            <div className='contentDiv'>
                <span >Author: {blog.author}</span>
                <span className='form-span-20'>Url: <a href='{blog.url}'>{blog.url}</a></span>
                <span>Likes: {blog.likes}</span> 
                <span className='form-span-20'><button onClick={onClick}>Like</button></span> 
            </div>
               
         </Togglable2>
         )
        }
        
        export default Blog