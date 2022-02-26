import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import noteService from './services/notes'

const store = createStore(noteReducer)
noteService
  .getAll()
  .then(initialNotes => {
    store.dispatch({ type: 'INITIALIZE', data: { notification: null, notes: initialNotes } })
  })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')

)

