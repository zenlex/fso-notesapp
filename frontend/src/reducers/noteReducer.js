const noteReducer = (state = {}, action) => {
  switch (action.type) {
  case 'INITIALIZE':
    console.log('INITIALIZING STATE TO:', action.data)
    return action.data

  case 'NEW_NOTE':
    return { ...state, notes:[...state.notes, action.data] }

  case 'TOGGLE_IMPORTANCE': {
    const id = action.data
    const noteToChange = state.notes.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    return { ...state, notes: state.notes.map(note => note.id === id ? changedNote : note ) }
  }

  case 'SET_NOTIFICATION':{
    console.log('reducer calling notification', action.data)
    return { ...state, notification: action.data }
  }

  case 'TOGGLE_SHOW_ALL':
    return { ...state, showAll: !state.showAll }
  default:
    return state
  }
}

export default noteReducer