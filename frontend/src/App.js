import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notes from './components/NotesContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  //-------STATE MANAGEMENT-------//
  const user = useSelector( state => state.user )
  const dispatch = useDispatch()

  //-------HOOKS-------//
  useEffect(() => {
    dispatch(initializeNotes())
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
