
const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
    
    return 1;
     
   }
  


const format = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  }

  const initialBlogs = [
    {
      title: 'Kona sub-8',
      author: 'Mark Allen',
      url: 'http://triathlonhaaste.blogspot.com/',
      likes: 1
    },
    {
      title: 'Miten hyödyntää tekoälyajan tärkeintä kilpailuvalttia dataa?',
      author: 'Leo Kärkkäinen',
      url: 'https://www.tekoalyaika.fi/2018/10/miten-hyodyntaa-tekoalyajan-tarkeinta-kilpailuvalttia-dataa/',
      likes: 1
    }
  ]

const totalLikes = (blogs) => {
      
    const countedLikes = blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0);

    const max = blogs.reduce(function(prev, current) {
        
    return (prev.y > current.y) ? prev : current
    }) 

    console.log('max: ', max)
    console.log('countedLikes: ', countedLikes)
    return countedLikes;

}

const mostLikedBlog = (blogs) => {

        function getMax(blogs, prop) {
            var max;
            console.debug('length: ', blogs.length)
            for (var i=0 ; i<blogs.length ; i++) {
                console.debug('blogs: ', blogs[i][prop])
                if (!max || parseInt(blogs[i][prop]) > parseInt(max[prop])) 
                    max = blogs[i];
            }
            console.debug('max: ', max)
            return max;
            
        }
        
        var maxLikedBlog = getMax(blogs, "likes");
        console.debug("Most liked blog: ", maxLikedBlog);
        return maxLikedBlog;

}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
  }

  const formatUser = (user) => {
    return {
      username: user.username,
      name: user.name,
      password: user.password
    }
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
  }
  

  module.exports = {
    format, initialBlogs, dummy, totalLikes, mostLikedBlog, blogsInDb, formatUser, usersInDb 
  }