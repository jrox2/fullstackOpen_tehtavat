import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, nameObject) => {
    const request = axios.put(`${baseUrl}/${id}`, nameObject)
    console.log('reguest updatessa persons.js: ', nameObject.name, ' : ', nameObject.number )
    return request.then(response => response.data)
  }
  
  const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('poistetaan: ', id )
    return request.then(response => response.data)
  }
  

  export default { getAll, create, update, deletePerson }