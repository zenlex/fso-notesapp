import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  //-------STATE MANAGEMENT-------//
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  //-------HOOKS-------//
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  //-------HANDLERS-------//
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
    } catch (err) {
      console.log(err)
      setErrorMessage(err)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setErrorMessage(`${user.name} logged out`)
    setUser(null)
    setTimeout(() => setErrorMessage(null), 3000)
  }


  const addNote = (noteObj) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObj)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(err => {
        setErrorMessage(err)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  //-----------RENDER RETURN------------//
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <Notification message={errorMessage} />

      {user ?
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable ref={noteFormRef} buttonLabel="add note">
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
        :
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
          />
        </Togglable>

      }


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <h1>Notes:</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>

      <Footer />
    </div >
  )
}

export default App
