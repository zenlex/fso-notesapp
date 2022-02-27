import Note from './Note'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { toggleImportance } from '../reducers/noteReducer'
import { setNotificationMsg } from '../reducers/notificationReducer'
import noteService from '../services/notes'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  console.log({ notes })
  const filterState = useSelector(state => state.filter)
  const noteFilter = (n) => {
    if(filterState === 'IMPORTANT'){
      return n.important
    }
    if(filterState === 'NONIMPORTANT'){
      return !n.important
    }
    return true
  }

  const filterSelected = (value) => {
    dispatch(setFilter(value))
  }

  const notesToShow = notes.filter(noteFilter)

  const toggleImportanceOf = note => {
    const { id } = note
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(() => {
        dispatch(toggleImportance(id))
      })
      .catch(err => {
        dispatch(setNotificationMsg({ type:'ERROR', message:err.message }))
        setTimeout(() => {
          dispatch(setNotificationMsg(null))
        }, 5000)
      })
  }

  return (
    <>
      <div>
        <div>
        all <input type="radio" name="filter" checked={filterState === 'ALL'}
            onChange={() => filterSelected('ALL')}/>
        important <input type="radio" name="filter"
            onChange={() => filterSelected('IMPORTANT')} checked={filterState === 'IMPORTANT'}/>
        nonimportant <input type="radio" name="filter"
            onChange={() => filterSelected('NONIMPORTANT')} checked={filterState === 'NONIMPORTANT'}/>
        </div>
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