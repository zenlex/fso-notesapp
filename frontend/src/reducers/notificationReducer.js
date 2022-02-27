import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    setNotificationMsg(state, action) {
      console.log(action.payload)
      state = action.payload
    }
  }
})

export const { setNotificationMsg } = notificationSlice.actions
export default notificationSlice.reducer
