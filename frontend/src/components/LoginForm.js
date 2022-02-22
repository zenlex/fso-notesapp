import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(username, password)
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