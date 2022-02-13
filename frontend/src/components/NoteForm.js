import React from "react"

const NoteForm = ({ addNote, newNote, noteChangeHandle }) => (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={noteChangeHandle}
    />
    <button type='submit'>save</button>
  </form>
)

export default NoteForm;