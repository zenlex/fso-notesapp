import React from 'react'
import { useSelector } from 'react-redux'

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
const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }
  const isError = false // message instanceof Error
  const resultMsg = isError ? message.response.data.error : message

  return (
    <div style={isError ? errorStyle : messageStyle} className="notification">
      {resultMsg}
    </div>
  )
}

export default Notification