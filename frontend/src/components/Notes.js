import Note from './Note'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { toggleImportance } from '../reducers/noteReducer'
import { setAlert } from '../reducers/notificationReducer'
import noteService from '../services/notes'

const Notes = () => {
  const dispatch = useDispatch()
  const { notes, filter } = useSelector(( { filter, notes } ) => {
    if(filter === 'ALL'){
      return { notes, filter }
    }
    return filter === 'IMPORTANT'
      ? { notes: notes.filter(n => n.important), filter }
      : { notes: notes.filter(n => !n.important), filter }
  })

  const filterSelected = (value) => {
    dispatch(setFilter(value))
  }

  const toggleImportanceOf = async (note) => {
    try{
      const { id } = note
      const changedNote = { ...note, important: !note.important }
      await noteService.update(id, changedNote)
      dispatch(toggleImportance(id))
    }catch(err) {
      dispatch(setAlert({ type:'ERROR', message:err.message }, 3))
    }
  }

  return (
    <>
      <div>
        <div>
        all <input type="radio" name="filter" checked={filter === 'ALL'}
            onChange={() => filterSelected('ALL')}/>
        important <input type="radio" name="filter"
            onChange={() => filterSelected('IMPORTANT')} checked={filter === 'IMPORTANT'}/>
        nonimportant <input type="radio" name="filter"
            onChange={() => filterSelected('NONIMPORTANT')} checked={filter === 'NONIMPORTANT'}/>
        </div>
      </div>
      <h1>Notes:</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportanceOf={toggleImportanceOf} />)} {/*TODO: refactor prop drilling of errormessage*/}
      </ul>
    </>
  )

}

export default Notes