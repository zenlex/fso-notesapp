
export const setUser = (userObj) => {
  return {
    type: 'SET_USER',
    data: userObj
  }
}

const userReducer = (state = {}, action) => {

  switch (action.type) {
  case 'SET_USER':
    return action.data

  default:
    return state
  }

}

export default userReducer