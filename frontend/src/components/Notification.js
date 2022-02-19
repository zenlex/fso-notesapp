import React from 'react'
const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  border: 'solid 2px red',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const messageStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  border: 'solid 2px green',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const isError = message instanceof Error
  const resultMsg = isError ? message.response.data.error : message

  return (
    <div style={isError ? errorStyle : messageStyle}>
      {resultMsg}
    </div>
  )
}

export default Notification