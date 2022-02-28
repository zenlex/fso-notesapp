import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setAlert = (msg, time) => {
  return dispatch => {
    dispatch(displayNotification(msg))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export default notificationSlice.reducer
