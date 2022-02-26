import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import noteService from './services/notes'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Notes from './components/NotesContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMsg, setUser } from './actions/actions'

const App = () => {
  //-------STATE MANAGEMENT-------//
  const dispatch = useDispatch()
  const user = useSelector( state => state.user )
  const noteFormRef = useRef()

  //-------HOOKS-------//

  // check for logged in user
  useEffect(() => {
  // TODO: refactor out to login form?
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      noteService.setToken(user.token)
    }
  }, [])

  //-------HANDLERS-------//
  // TODO: refactor out to login form?
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    dispatch(setNotificationMsg(`${user.name} logged out`))
    dispatch(setUser(null))
    setTimeout(() => dispatch(setNotificationMsg(null)), 3000)
  }
  //-----------RENDER RETURN------------//
  return (
    <div>
      <Notification />
      {/* TODO: could refactor this logic into the LoginForm...?*/}
      {user ?
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable ref={noteFormRef} buttonLabel="add note">
            <NoteForm />
          </Togglable>
        </div>
        :
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      }

      <Notes />
      <Footer />
    </div >
  )
}

export default App
