const INITIAL_STATE = { artists: [], user: {} }

export default function(state = INITIAL_STATE, action)  {
  switch (action.type) {
    case 'UPDATE_USERS':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'UPDATE_ARTISTS':
      return { ...state, artists: action.payload }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
