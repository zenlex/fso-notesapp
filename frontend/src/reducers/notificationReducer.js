export const setNotificationMsg = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    message : msg
  }
}

const notificationReducer = (state ='' , action) => {

  switch (action.type) {
  case 'SET_NOTIFICATION':{
    return action.message
  }
  default:
    return state
  }

}

export default notificationReducer