
import { useState } from 'react'
import noteService from '../services/notes'
import { useDispatch } from 'react-redux'
import { createNote } from '../actions/actions'

const NoteForm = (props) => {
  const [newNote, setNewNote] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    if(props.createNoteTest){
      props.createNoteTest({ content: newNote })
    }
    setNewNote('')
    // noteFormRef.current.toggleVisibility()
    noteService
      .create(newNote)
      .then(returnedNote => {
        dispatch(createNote(returnedNote))
      })
  }
  return (<div>
    <h2>add a new note</h2>

    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleChange}
        placeholder='write note content here'
        id='newcontent'
      />
      <button type='submit'>save</button>
    </form>
  </div >
  )
}

export default NoteForm