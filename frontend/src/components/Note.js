
const Note = ({ note, handleClick }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      <span>
        {note.content}
      </span>
      <button onClick={() => handleClick(note)}>{label}</button>
    </li>
  )
}

export default Note