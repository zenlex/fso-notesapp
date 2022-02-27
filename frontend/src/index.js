import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import noteService from './services/notes'
import store from './store'
import { setNotes } from './reducers/noteReducer'

noteService
  .getAll()
  .then(initialNotes => {
    store.dispatch(setNotes(initialNotes))
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  })

