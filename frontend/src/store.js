import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer:{
    notes: noteReducer,
    filter: filterReducer,
    user: userReducer,
    notification:notificationReducer
  }
})

export default store