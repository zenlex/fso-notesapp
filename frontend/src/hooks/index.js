/* eslint-disable no-unused-vars */
import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createNote, initializeNotes, toggleImportanceOf, updateNote } from '../reducers/noteReducer'

export const useResource = (url) => {
  const token = useSelector(state => {
    if (state.user) {
      return `bearer ${state.user.token}`
    } else {
      return null
    }
  })

  const { data } = useSelector(state => ({
    data: state.notes,
  }))

  const dispatch = useDispatch()

  const boundGetAll = useCallback(() => {
    return dispatch(initializeNotes())
  }, [dispatch])

  const boundCreate = useCallback((...args) => {
    return dispatch(createNote(...args))
  }, [dispatch])

  const boundToggleImport = useCallback((...args) => {
    return dispatch(toggleImportanceOf(...args))
  }, [dispatch])

  // useEffect(() => {
  //   if(!data) boundGetAll()
  // }, [boundGetAll, data])

  return {
    data,
    fetchAllNotes: boundGetAll,
    createNote: boundCreate,
    toggleImportance: boundToggleImport
  }
}
export default useResource
