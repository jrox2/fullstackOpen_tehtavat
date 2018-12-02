import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'
//const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const deleteBlog = (blogID, blogTitle) => {
    console.log('poistetaan blogID: ', blogID, ' blogTitle: ', blogTitle)
    const request = axios.delete(`${baseUrl}/${blogID}`)
    return request.then(response => response.data)
  }

  export default { getAll, deleteBlog}