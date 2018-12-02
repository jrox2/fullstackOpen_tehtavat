import React from 'react'

const BlogForm = ({ onSubmit, handleChange, title, author, url}) => {
    return (
        <div>
            <h2>Luo uusi blogi</h2>
        
            <form onSubmit={onSubmit}>
                <label>Title</label>
                <input 
                name="title"
                value={title}
                onChange={handleChange}
                />
                <label>Author</label>
                <input 
                name="author"
                value={author} 
                onChange={handleChange}
                />
                <label>Url</label>
                <input 
                name="url"
                value={url} 
                onChange={handleChange}
                />
                <button type="submit">tallenna</button>
            </form>
      </div>
    )
  }


  export default BlogForm