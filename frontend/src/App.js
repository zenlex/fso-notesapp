import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import noteService from './services/notes'
import Footer from './components/Footer'
import loginService from './services/login'
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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      noteService.setToken(user.token)
    }
  }, [])

  //-------HANDLERS-------//
  // TODO: refactor out this bit of state as well (wait until later in FSO to review best practices)
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      dispatch(setUser(user))
    } catch (err) {
      console.log(err)
      dispatch(setNotificationMsg(err))
      setTimeout(() => {
        dispatch(setNotificationMsg(null))
      }, 3000)
    }
  }

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
          <LoginForm
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      <Notes />
      <Footer />
    </div >
  )
}

export default App
