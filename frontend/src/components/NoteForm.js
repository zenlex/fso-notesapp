
import { useState, useRef } from 'react'
import noteService from '../services/notes'
import { useDispatch } from 'react-redux'
import { setNotificationMsg } from '../reducers/notificationReducer'
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

    // mock function injection for unit testing
    if(props.createNoteTest){
      props.createNoteTest({ content: newNote })
    }

    setNewNote('')
    noteFormRef.current.toggleVisibility()
    try{
      const returnedNote = await noteService.create(newNote)
      dispatch(createNote(returnedNote))
    }
    catch(err) {
      console.log(err)
      dispatch(setNotificationMsg({ type:'ERROR', message:err.response.data.error }))
      setTimeout(() => dispatch(setNotificationMsg(null)), 3000)
    }
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