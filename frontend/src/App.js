import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notes from './components/NotesContainer'
import { useSelector } from 'react-redux'
const App = () => {
  //-------STATE MANAGEMENT-------//
  const user = useSelector( state => state.user )

  //-------HOOKS-------//
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
