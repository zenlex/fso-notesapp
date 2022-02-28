import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'
import { setAlert } from './notificationReducer'

const initialState = []

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers:{
    appendNote(state, action) {
      state.push(action.payload)
    },

    toggleImportance(state, action) {
      console.log(action.payload)
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      const newState = state.map(note => note.id !== noteToChange.id ? note : changedNote)
      return newState
    },

    setNotes(state, action)  {
      return action.payload
    }
  }
})

export const { appendNote, toggleImportance, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    try{
      const notes = await noteService.getAll()
      dispatch(setNotes(notes))
    }catch(err){
      dispatch(setAlert({ type:'ERROR', message:err.response.data.error }, 3))
    }
  }
}

export const createNote = content => {
  return async dispatch => {
    try{
      const newNote = await noteService.create(content)
      dispatch(appendNote(newNote))
    }catch(err){
      dispatch(setAlert({ type:'ERROR', message:err.response.data.error }, 3))
    }
  }
}

export default noteSlice.reducer