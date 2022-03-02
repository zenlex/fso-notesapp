import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:3001/'
import { useDispatch, useSelector } from 'react-redux'
import { createNote, initializeNotes } from '../reducers/noteReducer'
export const useResource = (url) => {
  const token = useSelector(state => {
    if (state.user) {
      return `bearer ${state.user.token}`
    } else {
      return null
    }
  })
  const dispatch = useDispatch()

  const getAll = async () => {
    const response = await axios.get(url)
    dispatch(initializeNotes(response.data))
    return response.data
  }

  const create = async (content) => {
    console.log('calling create within useResource hook')
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(url, { content }, config)
    dispatch(createNote(response.data))
    return response.data
  }

  const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
  }

  return {
    getAll,
    create,
    update,
  }
}
export default useResource
