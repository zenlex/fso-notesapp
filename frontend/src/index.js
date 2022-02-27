import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import noteService from './services/notes'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'


const initialState =
  {
    user: null,
    notification: null,
    filter:'ALL',
    notes: []
  }

noteService
  .getAll()
  .then(initialNotes => {
    const store = configureStore(
      {
        reducer:{
          notes: noteReducer,
          filter: filterReducer,
          user: userReducer,
          notification: notificationReducer
        },
        preloadedState: {
          ...initialState,
          notes: initialNotes }
      })
    store.subscribe(() => console.log('Current Store: ', store.getState()))

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  })

