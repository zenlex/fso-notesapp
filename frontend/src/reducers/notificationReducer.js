import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    displayNotification(state, action) {
      console.log('setting notification: ', action.payload)
      return action.payload
    }
  }
})

export const { displayNotification } = notificationSlice.actions

export const setNotificationMsg = (msg) => {
  return dispatch => {
    dispatch(displayNotification(msg))
    setTimeout(() => dispatch(displayNotification(null)), 3000)
  }
}

export default notificationSlice.reducer
