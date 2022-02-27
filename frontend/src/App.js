import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notes from './components/NotesContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  //-------STATE MANAGEMENT-------//
  const user = useSelector( state => state.user )
  const dispatch = useDispatch()

  //-------HOOKS-------//
  useEffect(() => {
    noteService .getAll()
      .then(notes => {
        dispatch(setNotes(notes))
      })
  }, [])

  //-------HANDLERS-------//
  //-----------RENDER RETURN------------//
  return (
    <div>
      <Notification />
      <LoginForm />
      {user &&<NoteForm />}
      <Notes />
      <Footer />
    </div >
  )
}

export default App
