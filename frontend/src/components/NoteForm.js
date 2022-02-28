
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import Togglable from './Togglable'

const NoteForm = (props) => {
  const [newNote, setNewNote] = useState('')
  const dispatch = useDispatch()
  const noteFormRef = useRef(null)
  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = async (e) => {
    e.preventDefault()
    setNewNote('')

    // mock function injection for unit testing - refactor
    if(props.createNoteTest){
      props.createNoteTest({ content: newNote })
    }

    noteFormRef.current.toggleVisibility()
    dispatch(createNote(newNote))
  }

  //TODO: get autoFocus to work correctly on add note form
  return (
    <Togglable buttonLabel="add note" ref={noteFormRef}>
      <div>
        <h2>add a new note</h2>

        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleChange}
            placeholder='write note content here'
            id='newcontent'
            autoFocus
          />
          <button type='submit'>save</button>
        </form>
      </div >
    </Togglable>
  )
}

export default NoteForm