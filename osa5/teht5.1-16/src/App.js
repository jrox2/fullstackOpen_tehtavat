import React from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Togglable2 from './components/Togglable2'
import blogService from './services/blogs'
import loginService from './services/login'




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      title: '',
      user: '',
      author: '',
      url: '',
      likes: 0,
      showAll: true,
      error: null,
      success: null,
      username: '',
      password: '',
      user: ''
    
    }
  }

  componentWillMount() {
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs })
      })

      
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      console.log('loggedUserJSON: ', loggedUserJSON)
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({ user })
        console.log('loggedUserJSON_2: ', loggedUserJSON, ' user: ', user)
        blogService.setToken(user.token)
      }    
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }



  addblog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          success: `a new blog '${newBlog.user}' added`,
          newBlog: ''
        })
      })
      .catch(error => {
        this.setState({
          error: 'ei onnaa'
          
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
      
  }

  updateBlogLikes = (id, blog) => {
    
     return () => {
      
      const Ublog = this.state.blogs.find(n => n.id === id)
      let updatedLikes = Ublog.likes + 1

      this.setState({likes: updatedLikes})
      const blogObject = {
      id: Ublog.id,
      user: Ublog.user,
      title: Ublog.title,
      author: Ublog.author,
      url: Ublog.url,
      likes: updatedLikes
    }

    console.log('blogObject: ', blogObject)

    blogService
      .update(id, blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.map(blog => blog.id !== id ? blog : blogObject),
          success: `a new like '${newBlog.title}' added`,
          newBlog: ''
        })
       
      })
      .catch(error => {
        this.setState({
          error: 'ei onnaa'
          
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
      
  }
}

deleteRow = (paramId, paramName) => (e) => { 
  if (window.confirm("Poistetaanko: " +paramId+ ' paramName: ' +paramName)) {   
    const deletedIndex = this.state.blogs.findIndex(blog => blog.id === paramId)
    
    console.log('ParamId', paramId, 'paramName', paramName, 'deletedIndex: ', deletedIndex);
    
    blogService
      .deleteBlog(paramId)
      .then(res => {
        
        console.log('deletedIndex: ', deletedIndex)
        
        let array = this.state.blogs
        array.splice(deletedIndex, 1)
        console.log('array', array)

        this.setState({
          blogs: array
          
        })
      })
      .catch(error => {
        this.setState({
          error: `Blogi:  '${paramId
          }' on jo valitettavasti poistettu palvelimelta`,
          blogs: this.state.blogs.filter(n => n.id !== paramId)
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
    }
}

login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: user.username ,password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
      
      this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = (event) => {
    event = window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user:  ''})

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={e => this.setState({ loginVisible: true })}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          />
          <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
        </div>
      </div>
    )
   }
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }
      )
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  showSortedBlogs = (props) => {
    let testBlogs = this.state.blogs
    testBlogs.sort(function (a, b) {
      return b.likes - a.likes;
    });

    const blogsToShow =
    this.state.blogs

    const blogStyle = {
      padding: 10,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
  
    }
    
    return (
      <div className='form-row'>
       
            {testBlogs.map((blog, i) =>   
              <div>
                
                <form onSubmit={this.updateBlogLikes(blog.id, blog)}>
                  <div style={blogStyle} key={blog.i}>
                    <Togglable2 className="clickableElement" buttonLabel={blog.title} ref={component => this.blogForm = component}>
                      <span className='form-span-30'>Author: {blog.author}</span>
                      <span className='form-span-20'>Url: <a href='{blog.url}'>{blog.url}</a></span>
                      <span>Likes: {blog.likes}</span> 
                      <span>Added by: {blog.user.username !== undefined ? blog.user.username : '*' }</span>
                      <span className='form-span-20'><button type="submit">Like</button></span> 
                      <span>User: {this.state.user.username}</span>
                      <span className={this.state.user.username == blog.user.username ? 'visible' : 'hidden' }> 
                        <button onClick={this.deleteRow(blog.id, blog.name)}>Delete</button></span> 
                    </Togglable2>
                  </div>
                </form>
                
              </div>        
              
            )}
          
       </div>
      )
  }


 
  
  render() {
    const blogsToShow =
      this.state.blogs

      console.log('user appissa: ', this.state.user)
      
      const loginForm = () => {
        const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
        const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={e => this.setState({ loginVisible: true })}>Log in</button>
            </div>
            <div style={showWhenVisible}>
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                handleChange={this.handleLoginFieldChange}
                handleSubmit={this.login}
              />
              <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
            </div>
          </div>
        )
      }
    
    
    const blogForm = () => (
      <div>       
        <form onSubmit={this.addblog}>
            <input 
              name="title"
              value={this.state.title}
              onChange={this.handleBlogChange}
            />
            <input 
              name="author"
              value={this.state.author} 
              onChange={this.handleBlogChange}
            />
            <input 
              name="url"
              value={this.state.url} 
              onChange={this.handleBlogChange}
            />
            <button type="submit">Tallenna</button>
          </form>
      </div>
    )

    return (
      <div>
        <h1>Blogilistaus</h1>
        <div className='form-row'>
          <ErrorNotification message={this.state.error}/> 
        </div>
        <div className='form-row'>
          <SuccessNotification message={this.state.success}/> 
        </div>
        
        {this.state.user === '' ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in
              <button onClick={this.handleLogout}>Logout</button>   
            </p>          
          </div>
        }
        <ul>   
        
        {this.state.user !== '' ?
        <div>
          <Togglable buttonLabel="Lisää uusi blogi" ref={component => this.blogForm = component}>
            <BlogForm
              onSubmit={this.addblog}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              handleChange={this.handleBlogChange}
              />
          </Togglable>
          <this.showSortedBlogs /></div> :
          <p>Please login</p>

        }
       
        </ul>
       
      </div>
    )
  }
}



export default App;
