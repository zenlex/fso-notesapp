import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { setNotificationMsg, setUser } from '../actions/actions'
import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = () => {
  // FORM CONTROLS
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  // STATE MANAGEMENT
  const dispatch = useDispatch()

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



  return (
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
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm