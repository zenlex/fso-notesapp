import { useState } from 'react'
import Note from './Note'
import { useSelector } from 'react-redux'


const Notes = ({ setErrorMessage }) => {
  const notes = useSelector(state => state)
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <h1>Notes:</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} setErrorMessage={setErrorMessage}/>)} {/*TODO: refactor prop drilling of errormessage*/}
      </ul>
    </>
  )

}

export default Notes