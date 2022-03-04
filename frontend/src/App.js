import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import { useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  //-------STATE MANAGEMENT-------//
  const user = useSelector( state => state.user )

  //-------HOOKS-------//
  // useEffect(() => {
  //   dispatch(initializeNotes())
  // }, [])

  //-------HANDLERS-------//
  //-----------RENDER RETURN------------//
  return (
    <div>
      <Notification />
      <LoginForm />
      {user &&<NoteForm />}
      {user && <Notes />}
      <Footer />
    </div >
  )
}

export default App
