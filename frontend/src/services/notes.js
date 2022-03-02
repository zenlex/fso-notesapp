import axios from 'axios'
const baseUrl = '/api/notes'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (content) => {
  console.log('calling create in the wrong place')
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { content }, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const exports = {
  create,
  update,
  getAll
}

export default exports
