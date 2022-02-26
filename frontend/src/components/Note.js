import { toggleImportance } from '../actions/actions'
import { useDispatch } from 'react-redux'
import noteService from '../services/notes'

const Note = ({ note, setErrorMessage }) => {
  const dispatch = useDispatch()

  const toggleImportanceOf = id => {
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(() => {
        dispatch(toggleImportance(id))
      })
      .catch(err => {
        setErrorMessage(err)
        setTimeout(() => {
          setErrorMessage(null)
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