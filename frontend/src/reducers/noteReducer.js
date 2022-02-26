const noteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    console.log('INITIALIZING STATE TO:', action.data)
    return action.data

  case 'NEW_NOTE':
    return [...state, action.data]

  case 'TOGGLE_IMPORTANCE': {
    const id = action.data
    const noteToChange = state.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    return state.map(note => note.id === id ? changedNote : note )
  }

  default:
    return state
  }
}

export default noteReducer