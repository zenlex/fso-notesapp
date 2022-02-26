import Note from './Note'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowAll } from '../actions/actions'
import { toggleImportance, setNotificationMsg } from '../actions/actions'
import noteService from '../services/notes'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const showAll = useSelector(state => state.showAll)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = note => {
    const { id } = note
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(() => {
        dispatch(toggleImportance(id))
      })
      .catch(err => {
        dispatch(setNotificationMsg(err))
        setTimeout(() => {
          dispatch(setNotificationMsg(null))
        }, 5000)
      })
  }

  return (
    <>
      <div>
        <button onClick={() => dispatch(toggleShowAll())}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <h1>Notes:</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportanceOf={toggleImportanceOf} />)} {/*TODO: refactor prop drilling of errormessage*/}
      </ul>
    </>
  )

}

export default Notes