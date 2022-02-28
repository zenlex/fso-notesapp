import Note from './Note'
import { toggleImportanceOf } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const Notes = ({ notes, toggleImportanceOf }) => {

  return (
    <>
      <div>
        <Filter />
      </div>
      <h1>Notes:</h1>
      <ul>
        {notes.length > 0 && notes.map(note =>
          <Note key={note.id} note={note} handleClick={toggleImportanceOf} />)} {/*TODO: refactor prop drilling of errormessage*/}
      </ul>
    </>
  )

}

const mapStateToProps = (state) => {
  if(state.filter === 'ALL'){
    return {
      notes: state.notes,
      filter: state.filter
    }
  }
  return {
    notes: (state.filter === 'IMPORTANT'
      ?  state.notes.filter(n => n.important)
      :  state.notes.filter(n => !n.important)),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  toggleImportanceOf
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes