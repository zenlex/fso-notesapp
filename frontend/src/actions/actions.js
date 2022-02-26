
export const createNote = (noteObj) => {
  return {
    type: 'NEW_NOTE',
    data: noteObj
  }
}

export const toggleImportance = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: id
  }
}

export const setNotificationMsg = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    data: msg
  }
}

export const toggleShowAll = () => {
  return {
    type: 'TOGGLE_SHOW_ALL'
  }
}

export const setUser = (userObj) => {
  return {
    type: 'SET_USER',
    data: userObj
  }
}