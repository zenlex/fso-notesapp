import Note from './Note'
import { connect } from 'react-redux'
import Filter from './Filter'
import { useResource } from '../hooks'

const Notes = ({ notes }) => {
  const { data, toggleImportance, fetchAllNotes } = useResource()
  if(!data){
    fetchAllNotes()
    return('Loading...')
  }
  return (
    <>
      <div>
        <Filter />
      </div>
      <h1>Notes:</h1>
      <ul>
        {notes.length > 0 && notes.map(note =>
          <Note key={note.id} note={note} handleClick={toggleImportance} />)} {/*TODO: refactor prop drilling of errormessage*/}
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

const ConnectedNotes = connect(mapStateToProps, null)(Notes)
export default ConnectedNotes