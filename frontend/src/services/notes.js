import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:3001/'
import { useSelector } from 'react-redux'
const baseUrl = '/api/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const token = useSelector(state => ({ token: state.user.token }))
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { content }, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const exports = {
  create,
  update,
  getAll
}

export default exports
