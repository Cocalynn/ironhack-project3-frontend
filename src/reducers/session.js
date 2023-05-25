import { CLEAR_SESSION, SET_SESSION } from '../constants/actionTypes'

const initialState = {
  isLoggedIn: false,
  user: null
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        user: action.session,
        isLoggedIn: !!action.session
      }

    case CLEAR_SESSION:
      return initialState

    default:
      return state
  }
}

export default session
