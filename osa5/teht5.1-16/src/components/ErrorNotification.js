import React from 'react'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification