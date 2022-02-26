import Note from './Note'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowAll } from '../actions/actions'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const showAll = useSelector(state => state.showAll)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

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
          <Note key={note.id} note={note} />)} {/*TODO: refactor prop drilling of errormessage*/}
      </ul>
    </>
  )

}

export default Notes