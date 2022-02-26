
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

