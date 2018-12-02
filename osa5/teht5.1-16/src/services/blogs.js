import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const update = (id, newObject) => {
  console.log('id: ', id)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('poistetaan: ', id )
  return request.then(response => response.data)
}
export default { getAll, create, update, setToken, deleteBlog }