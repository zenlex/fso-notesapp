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
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div style={notification.type === 'ERROR' ? errorStyle : messageStyle} className="notification">
      {notification.message}
    </div>
  )
}

export default Notification