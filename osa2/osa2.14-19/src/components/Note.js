import React from 'react'

const Note = ({ note }) => {
  return (
    <li> MOOI { String( note.important ) } {note.content}</li>
  )
}

export default Note