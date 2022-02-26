import { toggleImportance } from '../actions/actions'
import { useDispatch } from 'react-redux'
import noteService from '../services/notes'
import { setNotificationMsg } from '../actions/actions'

const Note = ({ note }) => {
  const dispatch = useDispatch()

  const toggleImportanceOf = id => {
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

  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      <span>
        {note.content}
      </span>
      <button onClick={() => toggleImportanceOf(note.id)}>{label}</button>
    </li>
  )
}

export default Note