import React from 'react'
import blogService from './services/blogs'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      likes: '',
      success: null,
      error: null
    }

    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    blogService
      .getAll()
      .then(blogs => {
        console.log('found blogs', blogs )
        this.setState({blogs})
        
          
        })
        .catch(error => {
          console.log(error)
      })
  }
  
  showFilteredBlogs = (props) => {
    let testBlogs = this.state.blogs
    
    return (
      <div className='form-row'>
        <table>
          <tbody>
            {testBlogs.map((blog, i) => 
            <tr key={i}><td className='form-td-50'>Title: {blog.title}</td><td className='form-td-30'>Author: {blog.author}</td><td className='form-td-20'>Url: <a href='{blog.url}'>{blog.url}</a></td><td>Likes: {blog.likes}</td><td className='form-td-20'><button onClick={this.deleteRow(blog.id, blog.title)}>Poista</button></td></tr>)}    
          </tbody>
        </table>
      </div>
      )
  }

  deleteRow = (paramId, paramName) => (e) => {
    console.log('deleting: ', paramId, ' blogTitle: ', paramName)

    if (window.confirm("Poistetaanko: " +paramName)) {   
      const deletedIndex = this.state.blogs.findIndex(blog => blog.id === paramId)
      
      console.log('ParamId', paramId, 'paramName', paramName, 'deletedIndex: ', deletedIndex);
   
      blogService
        .deleteBlog(paramId)
        .then(blogs => {
          console.log('deleting')
        })
        .then(res => {
            
          console.log('deletedIndex: ', deletedIndex)
          
          let array = this.state.blogs
          array.splice(deletedIndex, 1)
          console.log('array', array)

          this.setState({
            persons: array
            
          })
        })
        .catch(error => {
          this.setState({
            error: `Blogilistaus:  '${paramName
            }' on jo valitettavasti poistettu palvelimelta`,
            persons: this.state.persons.filter(n => n.id !== paramId)
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
      }
  }

  render() {
    console.log('render')
    return (
      <div>
        <h2>Blogilista</h2>
      
        <ul>   
          <this.showFilteredBlogs />
        </ul>
        
      </div>
    )
  }
}

export default App;
