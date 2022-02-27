import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers:{
    createNote(state, action) {
      console.log('createnote action: ', action)
      const newNote = action.payload
      state.push(newNote)
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

export const { createNote, toggleImportance, setNotes } = noteSlice.actions
export default noteSlice.reducer