import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMsg } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import noteService from '../services/notes'
import Togglable from './Togglable'

const LoginForm = () => {
  // FORM CONTROLS
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  // STATE MANAGEMENT
  const dispatch = useDispatch()
  // check for logged in user
  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      noteService.setToken(user.token)
    }
  }, [])

  let user = useSelector( state => state.user)

  const handleLogout = () => {
    window.sessionStorage.removeItem('loggedNoteAppUser')
    dispatch(setNotificationMsg(`${user.name} logged out`))
    dispatch(setUser(null))
    setTimeout(() => dispatch(setNotificationMsg(null)), 3000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.sessionStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      dispatch(setUser(user))
    } catch (err) {
      console.log(err)
      // dispatch(setNotificationMsg(err))
      setTimeout(() => {
        dispatch(setNotificationMsg(null))
      }, 3000)
    }
  }

  if(user){
    return(
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }else{
    return (
      <Togglable buttonLabel="login">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleLogin(username, password)
          setUsername('')
          setPassword('')
        }}>
          <div>
        username
            <input
              type="text"
              value={username}
              id='username'
              onChange={handleUsernameChange}
            />
          </div>
          <div>
        password
            <input
              type="password"
              value={password}
              id='password'
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" id="login-btn">login</button>

        </form>
      </Togglable>
    )
  }
}

export default LoginForm